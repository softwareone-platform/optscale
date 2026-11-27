"""
File-based liveness signal for the worker.

The worker processes one task for hours inside the kombu consumer loop, so
"the process is alive" cannot be derived from log activity or from AMQP
traffic. Instead, the process touches a file whenever it makes progress
(every consumer loop iteration while idle, every page of prices while a
discovery runs) and the Kubernetes liveness probe checks that the file was
touched recently. A hang in any blocking call (HTTP, Mongo, AMQP) stops the
touches and the pod is restarted.
"""
import logging
import os
import time

LOG = logging.getLogger(__name__)
LIVENESS_FILE_ENV = 'LIVENESS_FILE'
DEFAULT_LIVENESS_FILE = '/tmp/insider-worker-alive'
# avoid touching the file on every single page when pages are fast
MIN_TOUCH_INTERVAL = 5  # seconds

_last_touch = 0.0


def liveness_file():
    return os.environ.get(LIVENESS_FILE_ENV, DEFAULT_LIVENESS_FILE)


def touch(force=False):
    """Record that the worker made progress. Never raises."""
    global _last_touch
    now = time.monotonic()
    if not force and now - _last_touch < MIN_TOUCH_INTERVAL:
        return
    path = liveness_file()
    try:
        with open(path, 'a', encoding='utf-8'):
            pass
        os.utime(path, None)
        _last_touch = now
    except OSError as exc:
        LOG.warning('Unable to touch liveness file %s: %s', path, exc)
