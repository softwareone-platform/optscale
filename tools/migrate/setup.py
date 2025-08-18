#!/usr/bin/env python
import sys
from setuptools import setup

setup(name='migrate',
      description='Create and apply alembic migrations',
      url='http://hystax.com',
      author='Hystax',
      author_email='info@hystax.com',
      package_dir={'migrate': ''},
      packages=['migrate'],
      install_requires=[],
      scripts=['migrate.py']
      )
