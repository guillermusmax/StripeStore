terraform {
  required_version = ">= 1.0.0"
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
  # Comentamos el backend S3 por ahora
  # backend "s3" {
  #   bucket         = "stripe-store-terraform-state"
  #   key            = "terraform.tfstate"
  #   region         = "us-east-1"
  #   encrypt        = true
  #   dynamodb_table = "terraform-state-lock"
  # }
}

provider "docker" {
  host = "unix:///var/run/docker.sock"
}

# Variables
variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
}

variable "app_name" {
  description = "Application name"
  type        = string
  default     = "stripe-store"
}

variable "app_port" {
  description = "Application port"
  type        = number
  default     = 3000
}

# Locals
locals {
  common_tags = {
    Environment = var.environment
    Project     = var.app_name
    ManagedBy   = "terraform"
  }
}

# Docker Network
resource "docker_network" "stripe_store" {
  name = "${var.app_name}-network"
}

# MongoDB Container
resource "docker_container" "mongodb" {
  name  = "${var.app_name}-mongodb"
  image = "mongo:latest"
  networks_advanced {
    name = docker_network.stripe_store.name
  }
  env = [
    "MONGO_INITDB_ROOT_USERNAME=admin",
    "MONGO_INITDB_ROOT_PASSWORD=password"
  ]
  ports {
    internal = 27017
    external = 27017
  }
  volumes {
    volume_name    = "${var.app_name}-mongodb-data"
    container_path = "/data/db"
  }
}

# Frontend Container
resource "docker_container" "frontend" {
  name  = "${var.app_name}-frontend"
  image = "stripe-store-frontend:latest"
  networks_advanced {
    name = docker_network.stripe_store.name
  }
  env = [
    "NODE_ENV=${var.environment}",
    "MONGODB_URI=mongodb://admin:password@${docker_container.mongodb.name}:27017/stripe-store"
  ]
  ports {
    internal = var.app_port
    external = var.app_port
  }
  depends_on = [docker_container.mongodb]
}

# Prometheus Container
resource "docker_container" "prometheus" {
  name  = "${var.app_name}-prometheus"
  image = "prom/prometheus:latest"
  networks_advanced {
    name = docker_network.stripe_store.name
  }
  ports {
    internal = 9090
    external = 9090
  }
  volumes {
    host_path      = "${path.module}/prometheus"
    container_path = "/etc/prometheus"
  }
  command = [
    "--config.file=/etc/prometheus/prometheus.yml",
    "--storage.tsdb.path=/prometheus",
    "--web.console.libraries=/usr/share/prometheus/console_libraries",
    "--web.console.templates=/usr/share/prometheus/consoles"
  ]
}

# Grafana Container
resource "docker_container" "grafana" {
  name  = "${var.app_name}-grafana"
  image = "grafana/grafana:latest"
  networks_advanced {
    name = docker_network.stripe_store.name
  }
  ports {
    internal = 3000
    external = 3001
  }
  env = [
    "GF_SECURITY_ADMIN_USER=admin",
    "GF_SECURITY_ADMIN_PASSWORD=admin"
  ]
  volumes {
    volume_name    = "${var.app_name}-grafana-data"
    container_path = "/var/lib/grafana"
  }
  depends_on = [docker_container.prometheus]
}