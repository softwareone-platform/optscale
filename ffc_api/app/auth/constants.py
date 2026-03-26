from fastapi import HTTPException, status

UNAUTHORIZED_EXCEPTION = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized."
)
FORBIDDEN_EXCEPTION = HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden.")
