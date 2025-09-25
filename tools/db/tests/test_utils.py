from db.utils import build_url


def test_build_url_minimal():
    assert build_url("http", host="localhost") == "http://localhost"


def test_build_url_with_username():
    assert build_url("http", username="user", host="localhost") == "http://user@localhost"


def test_build_url_with_username_password():
    assert build_url("http", username="user", password="pass", host="localhost") == "http://user:pass@localhost"


def test_build_url_with_port():
    assert build_url("http", host="localhost", port=8080) == "http://localhost:8080"


def test_build_url_with_path():
    assert build_url("http", host="localhost", path="db") == "http://localhost/db"
    assert build_url("http", host="localhost", path="/db") == "http://localhost/db"


def test_build_url_with_special_chars():
    url = build_url("http", username="user name", password="p@ss", host="localhost")
    assert url == "http://user%20name:p%40ss@localhost"


def test_build_url_all_fields():
    url = build_url("postgresql", username="user", password="pass", host="db.example.com", port=5432, path="mydb")
    assert url == "postgresql://user:pass@db.example.com:5432/mydb"
