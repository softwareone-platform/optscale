ARG VERSION=3.2.13
ARG ARCH

FROM quay.io/coreos/etcd:v${VERSION}-amd64 AS etcd-amd64

RUN apk update
# https://github.com/Yelp/dumb-init/issues/73#issuecomment-240439732
RUN apk add ca-certificates wget && update-ca-certificates
RUN apk --no-cache add curl
RUN wget $(curl -H "Accept: application/vnd.github.v3+json" https://api.github.com/repos/nexusriot/etcd-walker/releases/tags/0.0.11 | grep -Eo 'https://(.*linux_x64_static)') -O /bin/etcd-walker

FROM quay.io/coreos/etcd:v${VERSION}-arm64 AS etcd-arm64

RUN apt update
# https://github.com/Yelp/dumb-init/issues/73#issuecomment-240439732
RUN apt install -y ca-certificates wget && update-ca-certificates
RUN apt install -y curl
# TODO: fix bellow, it's not using arm version of binary, need to compile it from source
RUN wget $(curl -H "Accept: application/vnd.github.v3+json" https://api.github.com/repos/nexusriot/etcd-walker/releases/tags/0.0.11 | grep -Eo 'https://(.*linux_x64_static)') -O /bin/etcd-walker
ENV ETCD_UNSUPPORTED_ARCH=arm64

FROM etcd-${ARCH} AS final

RUN chmod +x /bin/etcd-walker
