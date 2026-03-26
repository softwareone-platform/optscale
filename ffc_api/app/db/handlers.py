from __future__ import annotations

from collections.abc import AsyncGenerator, Sequence
from datetime import UTC, datetime
from typing import Any, Generic, TypeVar

from sqlalchemy import ColumnExpressionArgument, Select, func, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy.orm.interfaces import ORMOption

from app.db.models import Tag, TimestampMixin
from app.db.models import Base as BaseModel
from app.optscale.models import (
    DataSource,
    Organization,
    Token,
    User,
    AuthUser,
    Assignment,
    Type,
    Role,
)
from app.optscale.models import Base as OptscaleBaseModel
from app.utils import utcnow_timestamp


M = TypeVar("M", bound=BaseModel | OptscaleBaseModel)


class DatabaseError(Exception):
    pass


class NotFoundError(DatabaseError):
    pass


class CannotDeleteError(DatabaseError):
    pass


class ConstraintViolationError(DatabaseError):
    pass


class NullViolationError(DatabaseError):
    pass


class BaseHandler(Generic[M]):
    model_cls: type[M]

    def __init__(self, session: AsyncSession):
        self.session = session
        self.default_options: list[ORMOption] = []

    async def get(
        self, id: str, extra_conditions: list[ColumnExpressionArgument] | None = None,
    ) -> M:
        query = select(self.model_cls).where(self.model_cls.id == id)
        if extra_conditions:
            query = query.where(*extra_conditions)

        if self.default_options:
            query = query.options(*self.default_options)

        result = await self.session.execute(query)

        instance = result.scalar_one_or_none()

        if instance is None:
            raise NotFoundError(f"{self.model_cls.__name__} with ID `{id}` wasn't found.")

        return instance

    async def query_db(
        self,
        base_query: Select | None = None,
        where_clauses: Sequence[ColumnExpressionArgument] | None = None,
        limit: int | None = None,
        offset: int | None = None,
        order_by: Sequence[ColumnExpressionArgument] | None = None,
        options: Sequence[ORMOption] | None = None,
        unique: bool = False,
    ) -> Sequence[M]:
        """
        Executes a database query with filtering, pagination, ordering, and options.

        This method allows for querying the database with conditions, applying additional
        filters, controlling pagination, ordering results, and enabling optional query options.

        Args:

            where_clauses (Sequence[ColumnExpressionArgument | Exists] | None, optional):
                - Additional conditions applied using `.where()`.
                - Useful for combining multiple filters dynamically.
                - Default is `None`.

            limit (int | None, optional):
                - Maximum number of results to return.
                - If `None`, retrieves all results.
                - Default is `50`.

            offset (int, optional):
                - Number of records to skip for pagination.
                - Default is `0`.


            order_by (str | None, optional):
                - Column name used to order the results.
                - Default is `"id"`.

            options (list[ORMOption] | None, optional):
                - SQLAlchemy ORM options to modify query behavior
                (e.g., `joinedload` for relationships).
                - Default is `None`.

            unique: Boolean (`True`) or `False` (`False`).
        Returns:
            Sequence[M]:
                - A list of objects matching the query.
                - If no records are found, returns an empty list.

        """
        # default query
        query = select(self.model_cls) if base_query is None else base_query
        # add the default options, if any
        query = self._apply_conditions_to_the_query(
            query=query, where_clauses=where_clauses, options=options, order_by=order_by
        )
        if limit:
            # apply limit
            query = query.limit(limit)
        if offset:
            # apply offset
            query = query.offset(offset)
        print(query)
        results = await self.session.scalars(query)
        if unique:
            return results.unique().all()
        return results.all()

    async def stream_scalars(
        self,
        extra_conditions: list[ColumnExpressionArgument] | None = None,
        order_by: list[ColumnExpressionArgument] | None = None,
        batch_size: int = 100,
    ) -> AsyncGenerator[M, None]:
        query = select(self.model_cls)
        query = self._apply_conditions_to_the_query(
            query=query, where_clauses=extra_conditions, order_by=order_by
        )
        result = await self.session.stream_scalars(
            query,
            execution_options={"yield_per": batch_size},
        )
        async for row in result:
            yield row
        await result.close()

    async def count(
        self,
        base_query: Select | None = None,
        where_clauses: Sequence[ColumnExpressionArgument] | None = None,
    ) -> int:
        """
        Counts the number of objects matching the given conditions.

        Args:
            *where_clauses (ColumnExpressionArgument): Filtering conditions.

        Returns:
            int: The count of matching records.
        """
        if base_query is not None:
            query = select(func.count(self.model_cls.id)).select_from(
                base_query.get_final_froms()[0]
            )
            if base_query.whereclause is not None:
                query = query.where(base_query.whereclause)
        else:
            query = select(func.count(self.model_cls.id))
        if where_clauses:
            query = query.where(*where_clauses)
        result = await self.session.execute(query)
        return result.scalars().one()

    async def first(
        self,
        base_query: Select | None = None,
        where_clauses: Sequence[ColumnExpressionArgument] | None = None,
    ) -> M | None:
        query = select(self.model_cls) if base_query is None else base_query
        query = self._apply_conditions_to_the_query(query=query, where_clauses=where_clauses)

        result = await self.session.execute(query)
        return result.scalars().first()

    async def _get_model_obj(self, id_or_obj: str | M) -> M:
        if isinstance(id_or_obj, str):
            return await self.get(id_or_obj)

        return id_or_obj

    def _apply_conditions_to_the_query(
        self,
        query: Select,
        where_clauses: Sequence[ColumnExpressionArgument] | None = None,
        options: Sequence[ORMOption] | None = None,
        order_by: Sequence[ColumnExpressionArgument] | None = None,
    ) -> Select:
        """
        Applies default options and extra conditions to the query.

        Args:
            query (Select): The query to modify.
            where_clauses (list[ColumnExpressionArgument] | None): Additional query conditions.

        Returns:
            Select: The modified query.
        """
        if where_clauses:
            query = query.where(*where_clauses)
        orm_options = (list(self.default_options) or []) + (list(options or []))
        if order_by:
            query = query.order_by(*order_by)
        if orm_options:
            query = query.options(*orm_options)
        return query


class ReadWriteHandler(BaseHandler[M]):
    async def create(self, obj: M) -> M:
        self.session.add(obj)
        await self._save_changes(obj)
        return obj

    async def get_or_create(
        self,
        *,
        defaults: dict[str, Any] | None = None,
        extra_conditions: list[ColumnExpressionArgument] | None = None,
        **filters: Any,
    ) -> tuple[M, bool]:
        defaults = defaults or {}
        query = select(self.model_cls).where(
            *(getattr(self.model_cls, key) == value for key, value in filters.items())
        )
        if extra_conditions:
            query = query.where(*extra_conditions)
        if self.default_options:
            query = query.options(*self.default_options)
        result = await self.session.execute(query)
        obj = result.scalars().first()

        if obj:
            return obj, False

        params = filters
        params.update(defaults)

        obj = await self.create(self.model_cls(**params))
        return obj, True

    async def update(self, id_or_obj: str | M, data: dict[str, Any]) -> M:
        obj = await self._get_model_obj(id_or_obj)
        for key, value in data.items():
            setattr(obj, key, value)

        await self._save_changes(obj)
        return obj

    async def delete(self, id_or_obj: str | M) -> M:
        obj = await self._get_model_obj(id_or_obj)

        if isinstance(obj, TimestampMixin):
            if obj.deleted_at:
                raise CannotDeleteError(f"{self.model_cls.__name__} object is already deleted.")

            column_updates = {"deleted_at": datetime.now(UTC)}
            if hasattr(obj, "deleted_ts"):
                column_updates["deleted_ts"] = utcnow_timestamp()
        else:
            raise CannotDeleteError(f"{self.model_cls.__name__} does not support delete operation.")

        return await self.update(obj, data=column_updates)

    async def _save_changes(self, obj: M):
        try:
            await self.session.flush()
        except IntegrityError as e:
            raise ConstraintViolationError(
                f"Failed to save changes to {self.model_cls.__name__}: {e}."
            ) from e
        await self.session.refresh(obj)


class ReadOnlyHandler(BaseHandler[M]):

    async def create(self, *args, **kwargs):
        raise DatabaseError("Model is read-only")

    async def update(self, *args, **kwargs):
        raise DatabaseError("Model is read-only")

    async def delete(self, *args, **kwargs):
        raise DatabaseError("Model is read-only")


class DataSourceHandler(ReadOnlyHandler[DataSource]):
    model_cls = DataSource

    def __init__(self, session: AsyncSession):
        super().__init__(session)
        self.default_options = [
            selectinload(DataSource.parent),
        ]


class OrganizationHandler(ReadWriteHandler[Organization]):
    model_cls = Organization


class TokenHandler(ReadOnlyHandler[Token]):
    model_cls = Token


class UserHandler(ReadOnlyHandler[User]):
    model_cls = User

    def __init__(self, session):
        super().__init__(session)
        self.default_options = [
            selectinload(User.auth_user)
            .load_only(AuthUser.id, AuthUser.email)
            .selectinload(AuthUser.assignments)
            .load_only(
                Assignment.user_id,
                Assignment.type_id,
                Assignment.role_id,
            ),
        ]



class TagHandler(ReadWriteHandler[Tag]):
    model_cls = Tag


class RoleHandler(ReadOnlyHandler[Role]):
    model_cls = Role


class TypeHandler(ReadOnlyHandler[Type]):
    model_cls = Type
