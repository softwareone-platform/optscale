FROM mariadb:10.3

# NOTE: the installation of peer-finder is duplicated with mongo/Dockerfile,
#       see the notes there and keep both Dockerfiles in sync

# x86 version:
# RUN set -x \
#   && apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates wget \
#   && rm -rf /var/lib/apt/lists/* \
#   && wget -O /usr/local/bin/peer-finder https://storage.googleapis.com/kubernetes-release/pets/peer-finder \
#   && chmod +x /usr/local/bin/peer-finder \
#   && apt-get purge -y --auto-remove ca-certificates wget


# arm version (adapted from the previous setup)
RUN set -x \
  && apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates wget \
  && rm -rf /var/lib/apt/lists/* \
  && wget https://github.com/kmodules/peer-finder/releases/download/v1.0.2/peer-finder-linux-arm64.tar.gz -O /tmp/peer-finder-linux-arm64.tar.gz \
  && tar -xzf /tmp/peer-finder-linux-arm64.tar.gz -C /tmp \
  && mv /tmp/peer-finder-linux-arm64 /usr/local/bin/peer-finder \
  && chmod +x /usr/local/bin/peer-finder \
  && apt-get purge -y --auto-remove ca-certificates wget

COPY docker_images/mariadb/galera /opt/galera/
COPY docker_images/mariadb/docker-entrypoint.sh /usr/local/bin/

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["mysqld"]
