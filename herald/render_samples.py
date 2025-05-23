import argparse
import sys
from collections import namedtuple
from email.generator import BytesGenerator
from operator import itemgetter
from pathlib import Path

from email_test_data import EMAIL_TEST_DATA

ConfigValue = namedtuple("ConfigValue", "value")


class FakeConfigClient:
    def get(self, _):
        return ConfigValue("1.2.3.4")


def render_samples(output_dir):
    base_dir = Path(__file__).resolve().parent.parent
    sys.path.insert(0, str(base_dir))
    from herald.modules.email_generator.generator import generate_email

    templates_dir = base_dir / "herald/modules/email_generator/templates"

    config_client = FakeConfigClient()

    for email_type in EMAIL_TEST_DATA.values():
        template_file = templates_dir / f"{email_type['template_type']}.html"
        if not template_file.exists():
            continue

        data = email_type.copy()

        if data["template_type"] == "weekly_expense_report":
            data["template_params"]["texts"]["pools"] = sorted(
                data["template_params"]["texts"]["pools"], key=itemgetter("cost"), reverse=True
            )

        email = generate_email(
            config_client,
            data["email"][0],
            data["subject"],
            data.get("template_params", {}),
            template_type=data["template_type"],
        )

        with open(output_dir / f"{email_type['template_type']}.eml", "wb") as fobj:
            gen = BytesGenerator(fobj)
            gen.flatten(email)


def main():
    parser = argparse.ArgumentParser(description="Process a directory path.")
    parser.add_argument("directory", type=Path, help="Path to the directory")

    args = parser.parse_args()

    if not args.directory.is_dir():
        print(f"Error: '{args.directory}' is not a valid directory.", file=sys.stderr)
        sys.exit(1)

    render_samples(args.directory)


if __name__ == "__main__":
    main()
