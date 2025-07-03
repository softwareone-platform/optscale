FROM mariadb:10.3

COPY docker_images/common/install-peer-finder.sh /tmp/install-peer-finder.sh
RUN chmod +x /tmp/install-peer-finder.sh
RUN /tmp/install-peer-finder.sh

COPY docker_images/mariadb/galera /opt/galera/
COPY docker_images/mariadb/docker-entrypoint.sh /usr/local/bin/

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["mysqld"]
