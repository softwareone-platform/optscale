#!/usr/bin/env bash

# TODO: Instead of this script we should use multi stage docker builds
#       but this is good enough until we get arround to it
#       Or even better -- see if we need this tool at all or if there is a better
#       way to install it (e.g. via a package manager)

set -x

arch="$(uname -m)"
dest_bin_path="/usr/local/bin/peer-finder"

apt-get update
apt-get install -y --no-install-recommends openssl ca-certificates wget
rm -rf /var/lib/apt/lists/*

if [[ "$arch" == "x86_64" || "$arch" == "amd64" ]]; then
    wget -O $dest_bin_path https://storage.googleapis.com/kubernetes-release/pets/peer-finder
elif [[ "$arch" == "aarch64" || "$arch" == "arm64" ]]; then
    wget https://github.com/kmodules/peer-finder/releases/download/v1.0.2/peer-finder-linux-arm64.tar.gz \
        -O /tmp/peer-finder-linux-arm64.tar.gz
    tar -xzf /tmp/peer-finder-linux-arm64.tar.gz -C /tmp
    mv /tmp/peer-finder-linux-arm64 $dest_bin_path
else
    echo "Unsupported architecture: $arch"
    exit 1
fi

chmod +x $dest_bin_path
apt-get purge -y --auto-remove ca-certificates wget

