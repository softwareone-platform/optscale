#!/usr/bin/env python
import sys
from setuptools import setup


requirements = ["httpx==0.28.1", "tenacity==9.1.2"]

setup(
    name="subspector-async-client",
    description="Subspector Async Client",
    url="http://hystax.com",
    author="Hystax",
    author_email="info@hystax.com",
    package_dir={"subspector_async_client": ""},
    packages=["subspector_async_client"],
    install_requires=requirements,
)
