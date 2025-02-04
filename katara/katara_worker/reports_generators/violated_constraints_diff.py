from katara.katara_worker.reports_generators.violated_constraints import (
    ViolatedConstraints)


class ViolatedConstraintsDiff(ViolatedConstraints):
    def generate(self):
        report = super().generate()
        if report:
            report['template_type'] = self.get_template_type(__file__)
        return report


def main(organization_id, report_data, config_client):
    return ViolatedConstraintsDiff(
        organization_id, report_data, config_client).generate()
