# Field Atlas

A static weekend trail planner with sample trails, search, difficulty filters, trail details, and a browser-local shortlist.

Run `python3 -m http.server 8080` from this directory and open `http://localhost:8080`.

Serve `index.html`, `style.css`, and `app.js` together from any static web server. Photos load from Unsplash, and fonts load from Google Fonts. The site uses fallback colors and fonts if these resources are unavailable.

## DevOps lab setup on Ubuntu EC2

Run this block as your regular user with sudo access on an x86_64 Ubuntu EC2 instance. It installs Docker, Git, curl, Java 21, the Kubernetes v1.36 tools, and Terraform 1.17.2.

```bash
(
  set -euo pipefail

  sudo apt-get update
  sudo apt-get install -y git curl ca-certificates gpg unzip docker.io openjdk-21-jdk-headless
  sudo systemctl enable --now docker

  getent group docker >/dev/null || sudo groupadd docker
  sudo usermod -aG docker "$USER"

  sudo install -d -m 0755 /etc/apt/keyrings
  k8s_repo='https://pkgs.k8s.io/core:/stable:/v1.36/deb/'
  curl -fsSL "${k8s_repo}Release.key" |
    sudo gpg --dearmor --yes -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
  printf 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] %s /\n' "$k8s_repo" |
    sudo tee /etc/apt/sources.list.d/kubernetes.list >/dev/null

  sudo apt-get update
  sudo apt-get install -y kubeadm kubelet kubectl
  sudo apt-mark hold kubeadm kubelet kubectl

  workdir=$(mktemp -d)
  trap 'rm -rf -- "$workdir"' EXIT
  cd "$workdir"
  release=terraform_1.17.2
  archive="${release}_linux_amd64.zip"
  url='https://releases.hashicorp.com/terraform/1.17.2'

  curl -fsSLO "$url/$archive"
  curl -fsSLO "$url/${release}_SHA256SUMS"
  grep -F "  $archive" "${release}_SHA256SUMS" | sha256sum -c -
  unzip -q "$archive"
  sudo install -m 0755 terraform /usr/local/bin/terraform
) && newgrp docker
```

`newgrp docker` opens a shell with the Docker group active. Verify the tools from that shell.

```bash
docker ps
kubeadm version -o short
kubelet --version
kubectl version --client
java -version
terraform version
```

The Docker group grants root-equivalent access. This setup installs the lab tools. Creating a Kubernetes cluster with `kubeadm init` and installing a pod network are separate steps. Java and Terraform are for DevOps practice. Field Atlas itself runs as a static website.
