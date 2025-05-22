import os
import logging
import pymustache

from bulldozer.bulldozer_worker.exceptions import NotSupportedException

LOG = logging.getLogger(__name__)


class DefaultImageNotSupported(Exception):
    pass


class TFGenerator:

    reserved_tags = ["Name", "Seed"]

    # default images by region id
    aws_image_region_map = {
        "us-east-1": "ami-084568db4383264d4",
        "us-east-2": "ami-04f167a56786e4b09",
        "us-west-1": "ami-04f7a54071e74f488",
        "us-west-2": "ami-075686beab831bb7f",
        "ca-central-1": "ami-08355844f8bc94f55",
        "ca-west-1": "ami-08de9ad05f5a6bf2a",
        "eu-central-1": "ami-03250b0e01c28d196",
        "eu-central-2": "ami-02e5b25bf94378a0c",
        "eu-west-1": "ami-0df368112825f8d8f",
        "eu-west-2": "ami-0a94c8e4ca2674d5a",
        "eu-south-1": "ami-0e3232c2663eadfd3",
        "eu-south-2": "ami-099d45c12f4cc3edc",
        "eu-west-3": "ami-0160e8d70ebc43ee1",
        "eu-north-1": "ami-0c1ac8a41498c1a9c",
        "sa-east-1": "ami-0d866da98d63e2b42",
        "ap-east-1": "ami-050f19c6ee04f419b",
        "ap-southeast-3": "ami-05212caffa4a257da",
        "ap-southeast-4": "ami-0633898896cb139bc",
        "ap-southeast-5": "ami-0d6547c3f05df32d3",
        "ap-southeast-7": "ami-0d968d1497ff9cf0c",
        "ap-south-1": "ami-0e35ddab05955cf57",
        "ap-south-2": "ami-053a0835435bf4f45",
        "ap-northeast-3": "ami-08a7bc2c4efd0df53",
        "ap-northeast-2": "ami-0d5bb3742db8fc264",
        "ap-southeast-1": "ami-01938df366ac2d954",
        "ap-southeast-2": "ami-0f5d1713c9af4fe30",
        "ap-northeast-1": "ami-026c39f4021df9abe",
        "af-south-1": "ami-0b7e05c6022fc830b",
        "il-central-1": "ami-0ae7e1e8fb8251940",
        "me-south-1": "ami-01bd9cab74e4931ba",
        "me-central-1": "ami-09c1ab2520ee9181a",
        "mx-central-1": "ami-08252046d3814a994",
    }

    def __init__(self, seed,
                 name,
                 image,
                 region,
                 instance_type,
                 user_data=None,
                 venv=None,
                 key=None,
                 tags=None,
                 open_ingress=False,
                 spot_price=None,
                 ):
        if tags is None:
            tags = dict()

        self.seed = seed
        self.name = name
        self._image = image
        self.region = region
        self.key = bool(key)
        self.key_name = key
        self.instance_type = instance_type
        self.user_data = user_data
        self.venv = venv
        self.tags = tags
        self.open_ingress = open_ingress
        self.spot_price = spot_price

    @property
    def image(self):
        if not self._image:
            image = self.aws_image_region_map.get(self.region)
            if not image:
                raise DefaultImageNotSupported(
                    f"default image for region {self.region} not supported")
            self._image = image
        return self._image

    def generate_payload(self, spot=False):

        tags = [
            {"name": "Name", "val": self.name},
            {"name": "Seed", "val": self.seed}
        ]
        for k, v in self.tags.items():
            if k not in self.reserved_tags:
                tags.append({"name": k, "val": v})
            else:
                LOG.warning(
                    "skipping setting tag: %s because it's reserved", k
                )
        d = {
            "use_spot": spot,
            "name": self.name,
            "seed": self.seed,
            "image": self.image,
            "region": self.region,
            "key": self.key,
            "key_name": self.key_name,
            "instance_type": self.instance_type,
            "tags": tags,
            "open_ingress": self.open_ingress,
            "venv": self.venv,
        }
        if self.user_data:
            d.update({"user_data": self.user_data})
        if self.spot_price:
            d.update({"spot_price": self.spot_price})
        return d


class TFGeneratorAWS(TFGenerator):
    template_file = os.path.join(os.path.dirname(__file__), "templates",
                                 "aws.tft")

    def get_generate_func(self):
        return self.generate_payload()

    def render(self):
        with open(self.template_file, 'r', encoding='utf-8') as fh:
            template = fh.read()
        return pymustache.render(template, self.get_generate_func())


class TFGeneratorAWSSpot(TFGeneratorAWS):
    def get_generate_func(self):
        return self.generate_payload(spot=True)


class TFGeneratorFactory:

    TFGEN_MAP = {
        "AWS": TFGeneratorAWS,
        "AWS_SPOT": TFGeneratorAWSSpot,
    }

    @classmethod
    def get_generator(cls, platform):
        tfg = cls.TFGEN_MAP.get(platform)
        if not tfg:
            raise NotSupportedException(f"{platform} not supported")
        return tfg
