FROM python:3.12-slim
RUN mkdir -p /github/workspace
COPY main.py /github/workspace/main.py
RUN pip install requests
ENTRYPOINT ["python", "main.py"]
