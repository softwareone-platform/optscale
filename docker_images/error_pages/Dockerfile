# TODO: this image doesn't support arm64 yet but shouldn't be too hard to change that
#       parent Dockerfile: https://github.com/kubernetes/ingress-nginx/blob/main/images/custom-error-pages/rootfs/Dockerfile
ARG arch=amd64
FROM --platform="linux/${arch}" ingressnginx/custom-error-pages:v1.2.0

COPY docker_images/error_pages/www /www
