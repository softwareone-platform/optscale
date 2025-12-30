#!/usr/bin/env python
import sys
from setuptools import setup


requirements = ["requests==2.32.4", "retrying==1.4.1"]

setup(
    name="subspector-client",
    description="Subspector Client",
    url="http://hystax.com",
    author="Hystax",
    author_email="info@hystax.com",
    package_dir={"subspector_client": ""},
    packages=["subspector_client"],
    install_requires=requirements,
)
