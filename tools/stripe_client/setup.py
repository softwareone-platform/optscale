#!/usr/bin/env python
from setuptools import setup

requirements = ['stripe==12.3.0', 'tenacity==9.1.2']

setup(
      name='stripe-client',
      description='Hystax stripe client',
      url='http://hystax.com',
      author='Hystax',
      author_email='info@hystax.com',
      package_dir={'stripe_client': ''},
      packages=['stripe_client'],
      install_requires=requirements
)
