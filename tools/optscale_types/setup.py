#!/usr/bin/env python
import sys
from setuptools import setup

requirements = ['requests==2.32.3', 'SQLAlchemy==1.3.24',
                'optscale-exceptions==0.0.0', 'netaddr==0.7.19']

setup(name='optscale-types',
      description='OptScale Types',
      url='http://hystax.com',
      author='Hystax',
      author_email='info@hystax.com',
      package_dir={'optscale_types': ''},
      packages=['optscale_types'],
      install_requires=requirements,
      )
