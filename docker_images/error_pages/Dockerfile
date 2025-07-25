# TODO: The base image doesn't support arm64 yet but shouldn't be too hard to change that,
# though it will require a change in the `kubernetes/ingress-nginx` repo.
# References:
#   * Base image's Dockerfile: https://github.com/kubernetes/ingress-nginx/blob/main/images/custom-error-pages/rootfs/Dockerfile
#   * Relevant issue on GitHub: https://github.com/kubernetes/ingress-nginx/issues/10245

ARG arch=amd64
FROM --platform="linux/${arch}" ingressnginx/custom-error-pages:v1.2.0

COPY docker_images/error_pages/www /www
