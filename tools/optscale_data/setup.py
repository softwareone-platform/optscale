#!/usr/bin/env python
from setuptools import setup

requirements = [
      'clickhouse-connect==0.8.15',
]

setup(name='optscale-data',
      description='OptScale Data utils',
      url='http://hystax.com',
      author='Hystax',
      author_email='info@hystax.com',
      package_dir={'optscale_data': ''},
      packages=['optscale_data'],
      install_requires=requirements,
      )
