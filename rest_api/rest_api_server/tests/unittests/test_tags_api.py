import uuid

from freezegun import freeze_time
from sqlalchemy import and_
from unittest.mock import patch
from rest_api.rest_api_server.models.models import Tag, Type
from rest_api.rest_api_server.models.enums import TagTypes
from rest_api.rest_api_server.models.db_base import BaseDB
from rest_api.rest_api_server.models.db_factory import DBType, DBFactory
from rest_api.rest_api_server.tests.unittests.test_api_base import TestApiBase


class TestTagsApi(TestApiBase):

    def setUp(self, version="v2"):
        super().setUp(version)
        _, self.org = self.client.organization_create({"name": "organization"})
        self.org_id = self.org["id"]

        self.auth_user = self.gen_id()
        _, self.employee = self.client.employee_create(
            self.org_id,
            {"name": "employee", "auth_user_id": self.auth_user},
        )
        _, self.pool = self.client.pool_create(
            self.org_id,
            {"name": "sub", "parent_id": self.org["pool_id"]},
        )
        self.pool_id = self.pool["id"]
        patch("rest_api.rest_api_server.controllers.cloud_account."
              "CloudAccountController._configure_report").start()

        valid_aws_cloud_acc = {
            "name": "test_credentials",
            "type": "aws_cnr",
            "config": {
                "access_key_id": "key",
                "secret_access_key": "secret",
                "config_scheme": "create_report"
            }
        }

        _, self.ca = self.create_cloud_account(
            self.org_id,
            valid_aws_cloud_acc,
            auth_user_id=self.auth_user,
        )
        self.ca_id = self.ca["id"]
        self.types = {}
        self.create_types()

    def create_types(self):
        db = DBFactory(DBType.Test, None).db
        engine = db.engine
        session = BaseDB.session(engine)()
        cl_acc_type = Type(name=TagTypes.CLOUD_ACCOUNT.value)
        session.add(cl_acc_type)

        org_type = Type(name=TagTypes.ORGANIZATION.value)
        session.add(org_type)

        session.commit()

        self.types[TagTypes.CLOUD_ACCOUNT] = cl_acc_type.id
        self.types[TagTypes.ORGANIZATION] = org_type.id

    @staticmethod
    def get_tag_object(tag_id):
        db = DBFactory(DBType.Test, None).db
        engine = db.engine
        session = BaseDB.session(engine)()
        tag_obj = session.query(Tag).filter(Tag.id == tag_id).first()
        return tag_obj

    def test_create_tag(self):
        code, tag = self.client.tag_create(
            self.ca_id,
            {
                "name": "version",
                "value": "v1.0.1",
            },
            resource="cloud_accounts",
        )

        self.assertEqual(code, 201)
        self.assertEqual(tag["type_id"], self.types[TagTypes.CLOUD_ACCOUNT])
        self.assertEqual(tag["resource_id"], self.ca_id)
        self.assertEqual(tag["name"], "version")
        self.assertEqual(tag["value"], "v1.0.1")
        self.assertEqual(tag["deleted_at"], 0)
        self.assertEqual(tag["updated_at"], 0)
        self.assertNotEqual(tag["created_at"], 0)

        code, tag = self.client.tag_create(
            self.org_id,
            {
                "name": "management",
                "value": "direct",
            },
            resource="organizations",
        )

        self.assertEqual(code, 201)
        self.assertEqual(tag["type_id"], self.types[TagTypes.ORGANIZATION])
        self.assertEqual(tag["resource_id"], self.org_id)

    def test_create_tag_non_existing_resource(self):
        code, tag = self.client.tag_create(
            str(uuid.uuid4()),
            {
                "name": "version",
                "value": "v1.0.1",
            },
            resource="organizations",
        )

        self.assertEqual(code, 404)

    def test_list_tags(self):
        self.client.tag_create(
            self.ca_id,
            {
                "name": "version",
                "value": "v1.0.1",
            },
            resource="cloud_accounts",
        )
        self.client.tag_create(
            self.ca_id,
            {
                "name": "auto-payment",
                "value": "enabled",
            },
            resource="cloud_accounts",
        )
        self.client.tag_create(
            self.org_id,
            {
                "name": "management",
                "value": "direct",
            },
            resource="organizations",
        )

        code, tags = self.client.tag_list(self.ca_id, resource="cloud_accounts")

        self.assertEqual(code, 200)
        self.assertEqual(len(tags), 2)

        code, tags = self.client.tag_list(self.org_id, resource="organizations")

        self.assertEqual(code, 200)
        self.assertEqual(len(tags), 1)

    def test_get_tag(self):
        _, version_tag = self.client.tag_create(
            self.ca_id,
            {
                "name": "version",
                "value": "v1.0.1",
            },
            resource="cloud_accounts",
        )
        self.client.tag_create(
            self.ca_id,
            {
                "name": "auto-payment",
                "value": "disabled",
            },
            resource="cloud_accounts",
        )

        code, tag = self.client.tag_get(
            resource_id=self.ca_id,
            tag_name="version",
            resource="cloud_accounts",
        )

        self.assertEqual(code, 200)
        self.assertEqual(tag["id"], version_tag["id"])

    def test_get_tag_non_existing(self):
        code, response = self.client.tag_get(
            resource_id=self.org_id,
            tag_name="version",
            resource="organizations",
        )

        self.assertEqual(code, 400)
        self.assertEqual(
            response["error"]["reason"],
            f"Tag version for organization {self.org_id} not found",
        )

    def test_get_tag_resource_not_found(self):
        fake_id = str(uuid.uuid4())
        code, response = self.client.tag_get(
            resource_id=fake_id,
            tag_name="version",
            resource="cloud_accounts",
        )

        self.assertEqual(code, 404)
        self.assertEqual(
            response["error"]["reason"],
            f"CloudAccount {fake_id} not found",
        )

    def test_update_tag(self):
        _, tag = self.client.tag_create(
            self.ca_id,
            {
                "name": "version",
                "value": "v1.0.1",
            },
            resource="cloud_accounts",
        )

        code, updated_tag = self.client.tag_update(
            resource_id=self.ca_id,
            tag_name="version",
            params={"value": "v1.0.2"},
            resource="cloud_accounts",
        )

        self.assertEqual(code, 200)
        self.assertEqual(tag["id"], updated_tag["id"])
        self.assertNotEqual(tag["updated_at"], updated_tag["updated_at"])
        self.assertEqual(updated_tag["value"], "v1.0.2")

    def test_update_tag_already_exist(self):
        self.client.tag_create(
            self.org_id,
            {
                "name": "version",
                "value": "v1",
            },
            resource="organizations",
        )

        self.client.tag_create(
            self.org_id,
            {
                "name": "auto-payment",
                "value": "disabled",
            },
            resource="organizations",
        )

        code, response = self.client.tag_update(
            resource_id=self.org_id,
            tag_name="version",
            params={"name": "auto-payment", "value": "enabled"},
            resource="organizations",
        )

        self.assertEqual(code, 409)
        self.assertEqual(
            response["error"]["reason"],
            'Tag with name "auto-payment" already exists',
        )

    def test_update_tag_non_existing_resource(self):
        self.client.tag_create(
            self.ca_id,
            {
                "name": "auto-payment",
                "value": "disabled",
            },
            resource="cloud_accounts",
        )

        fake_id = str(uuid.uuid4())
        code, response = self.client.tag_update(
            resource_id=fake_id,
            tag_name="version",
            params={"value": "enabled"},
            resource="cloud_accounts",
        )

        self.assertEqual(code, 404)
        self.assertEqual(response["error"]["reason"], f"CloudAccount {fake_id} not found")

    def test_update_tag_wrong_parameters(self):
        self.client.tag_create(
            self.ca_id,
            {
                "name": "version",
                "value": "v1",
            },
            resource="cloud_accounts",
        )

        wrong_params = [
            ({"resource_id": str(uuid.uuid4())}, "Unexpected parameters: resource_id"),
            ({"created_at": 0}, 'Parameter "created_at" is immutable'),
            ({"value": 1}, "value should be a string"),
        ]

        for param, error in wrong_params:
            code, response = self.client.tag_update(
                resource_id=self.ca_id,
                tag_name="version",
                params=param,
                resource="cloud_accounts",
            )

            self.assertEqual(code, 400)
            self.assertEqual(
                response["error"]["reason"],
                error,
            )

    def test_update_tag_non_existing(self):
        self.client.tag_create(
            self.org_id,
            {
                "name": "auto-payment",
                "value": "disabled",
            },
            resource="organizations",
        )

        code, response = self.client.tag_update(
            resource_id=self.org_id,
            tag_name="unknown-tag",
            params={"value": "enabled"},
            resource="organizations",
        )

        self.assertEqual(code, 400)
        self.assertEqual(
            response["error"]["reason"],
            f"Tag unknown-tag for organization {self.org_id} not found",
        )

    def test_delete_tag(self):
        _, tag = self.client.tag_create(
            self.ca_id,
            {
                "name": "version",
                "value": "v1",
            },
            resource="cloud_accounts",
        )

        code, _ = self.client.tag_delete(
            resource_id=self.ca_id,
            tag_name="version",
            resource="cloud_accounts",
        )

        self.assertEqual(code, 204)

        deleted_tag = self.get_tag_object(tag["id"])
        self.assertNotEqual(deleted_tag.deleted_at, 0)
