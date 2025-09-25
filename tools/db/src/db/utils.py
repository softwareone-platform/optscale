import pathlib
from urllib.parse import quote, urlunparse

PROJECT_ROOT = pathlib.Path(__file__).parent.parent.parent.parent.resolve()


def build_url(
    scheme: str,
    username: str = "",
    password: str = "",
    host: str = "",
    port: int | None = None,
    path: str = "",
) -> str:
    netloc = ""
    if username:
        netloc += quote(username)
        if password:
            netloc += f":{quote(password)}"
        netloc += "@"
    netloc += host
    if port:
        netloc += f":{port}"

    # Ensure path starts with a slash if not empty
    if path and not path.startswith("/"):
        path = "/" + path

    return urlunparse((scheme, netloc, path, "", "", ""))
