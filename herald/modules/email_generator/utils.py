import importlib
import json
import logging
import sys
from pathlib import Path

from jinja2 import ChainableUndefined, Environment, FileSystemLoader, select_autoescape

LOG = logging.getLogger(__name__)
ENV = None


def get_current_dir() -> Path:
    return Path(__file__).resolve().parent


def load_filters_from_registry(env: Environment, custom_filters_dir: Path) -> None:
    """
    Load custom Jinja2 filters from a registry file.
    The registry file should be a JSON file containing a list of filters,
    where each filter is represented by a dictionary with 'name' and 'entrypoint' keys.
    The 'entrypoint' should be a string in the format 'module.path.to.function'.
    """
    filter_registry = custom_filters_dir / "filters_registry.json"
    if not filter_registry.exists():
        LOG.info(f"Filter registry file not found: {filter_registry}")
        return

    try:
        with open(filter_registry) as f:
            registry = json.load(f)
    except json.JSONDecodeError as e:
        LOG.error(f"Error loading filter registry from {filter_registry}: {e}")
        return

    if not isinstance(registry, list):
        LOG.error(f"Invalid filter registry format: {filter_registry} should contain a list of filters.")

    if custom_filters_dir not in sys.path:
        sys.path.insert(0, str(custom_filters_dir))  # Inject filter package root

    for item in registry:
        try:
            name = item["name"]
            module_path, func_name = item["entrypoint"].rsplit(".", 1)
        except (KeyError, ValueError) as e:
            LOG.warning(f"Invalid filter entry in registry: {item}. Error: {e}")
            continue
        try:
            module = importlib.import_module(module_path)
            func = getattr(module, func_name)
            env.filters[name] = func
        except ImportError as ie:
            LOG.warning(f"Failed to load filter '{name}': {ie}")
        except AttributeError:
            LOG.warning(f"Failed to load filter '{name}': module '{module_path}' has no attribute '{func_name}'")


def get_environment() -> Environment:
    current_dir = get_current_dir()

    global ENV
    if not ENV:
        ENV = Environment(
            loader=FileSystemLoader(
                [
                    current_dir / "custom_templates",
                    current_dir / "templates",
                ],
            ),
            autoescape=select_autoescape(),
            undefined=ChainableUndefined,
        )
        load_filters_from_registry(ENV, current_dir / "custom_filters")
    return ENV
