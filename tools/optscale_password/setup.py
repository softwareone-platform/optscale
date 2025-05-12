#!/usr/bin/env python
import sys
from setuptools import setup

requirements = []

setup(name='optscale-password',
      description='OptScale Password',
      url='http://hystax.com',
      author='Hystax',
      author_email='info@hystax.com',
      package_dir={'optscale_password': ''},
      packages=['optscale_password'],
      install_requires=requirements,
      )
