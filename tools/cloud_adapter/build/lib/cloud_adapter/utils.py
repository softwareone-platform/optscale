BYTES_IN_GB = 1024 * 1024 * 1024
BYTES_IN_MIB = 1024 * 1024


def gbs_to_bytes(gbs):
    return gbs * BYTES_IN_GB if gbs else 0


def mibs_to_bytes(mibs):
    return mibs * BYTES_IN_MIB if mibs else 0


class CloudParameter:
    def __init__(self, name, type, required, protected=False,
                 dependencies=None, default=None, readonly=False,
                 check_len=True):
        self.name = name
        self.type = type
        self.required = required
        self.protected = protected
        self.dependencies = dependencies
        self.default = default
        self.readonly = readonly
        self.check_len = check_len
