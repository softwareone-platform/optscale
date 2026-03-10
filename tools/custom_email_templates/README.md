---

## 📋 Description

This tool generates HTML email templates by merging reusable partials with individual content files for the FinOps project using:

- **Docker** – for a portable, dependency-free workflow using the provided Dockerfile and copy-templates.sh script.
- **Python and Jinja** – for a customizable, template-based approach using Python's templating capabilities.

To produce consistent, ready-to-use email templates for FinOps for Cloud

---

## Requirements

### Docker version
- [Docker](https://www.docker.com/) installed (v20+ recommended)
- Docker Desktop (optional, for managing images and containers visually)

### Python/Jinja version
- Python 3.12+
- [`uv`](https://github.com/astral-sh/uv) for fast Python environments and dependency management
- Templates directory structure at `<project_path>/tools/custom_email_templates/templates`


## 🚀 Usage

#### 🔧 Install

```bash
# 1. Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# 2. Install Python 3.12
uv python install 3.12

# 3. Create virtual environment
uv venv --python 3.12 venv

# 4. Activate environment
source venv/bin/activate

# 5. Install dependencies
uv pip install -r herald/requirements.txt
uv pip install -r herald/test-requirements.txt

# 6. Install additional dependencies
```

🛠️ **Modify** `herald/modules/email_generator/utils.py`:
```python
def get_current_dir() -> Path:
    # return Path(__file__).resolve().parent
    return Path("<project_path>/tools/custom_email_templates/templates) 
```
⚠️ **NOTE:** Do not commit this change.

#### ▶️ Run

```bash
# 1. Activate virtual environment
source venv/bin/activate

# 2. Build the docker image
./build.sh custom_email_templates local

# 3. Run the docker container
docker run -v <project_path>/tools/custom_email_templates/templates/:/usr/src/app/herald/modules/email_generator/custom_templates custom_email_templates:local

# 4. Generate templates
python3 herald/render_samples.py <project_path>/email_templates/generated_emails
 
```
## Reusable Partials
Reusable partials are available in the tools/custom_email_templates/templates/partials directory: 

| File Name                 | Purpose                                                                  |
|---------------------------|--------------------------------------------------------------------------|
| `base.html`               | Main template with layout structure; includes header and footer.         |
| `header.html`             | Metadata and global styles (responsive design).                          |
| `footer.html`             | Footer with links and subscription notes.                                |
| `goto_button.html`        | Reusable call-to-action button linking to FinOps for Cloud.              |
| `organization_block.html` | Reusable block to show title and subtitle like organization name and ID. |


---

### Usage in base.html
Base template is **partials/base.html** already includes:

```
{% include 'partials/header.html' %}
...
{% include 'partials/footer.html' %}
```

### Usage 'organization_block.html'

To include blocks **partials/organization_block.html** set variables `name` and `id` in your template file:

```python
{% set name = texts.organization.name %}
{% set id = texts.organization.id %}
{% include 'partials/organization_block.html' %}
```

### Usage "goto_button.html"

To include blocks **partials/organization_block.html** set variable `gotoLink`in your template file:

```python
{% set gotoLink = 'https://' + etcd.control_panel_link + texts.control_panel_parameters %}
{% include 'partials/goto_button.html' %}
```

##  Documentation

- Jinja Templating: [https://jinja.palletsprojects.com/en/stable/](https://jinja.palletsprojects.com/en/stable/)
