FROM mongo:3.6

COPY docker_images/common/install-peer-finder.sh /tmp/install-peer-finder.sh
RUN chmod +x /tmp/install-peer-finder.sh
RUN /tmp/install-peer-finder.sh

COPY docker_images/mongo/on-start.sh /on-start.sh
