terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = "full-stack-todo-app-463101"
  region  = "us-central1"
  zone    = "us-central1-a"
}

resource "google_project_service" "container" {
  service = "container.googleapis.com"
}

resource "google_container_cluster" "simple_cluster" {
  name     = "simple-gke-cluster"
  location = "us-central1-a"
  
  # Enable Workload Identity
  workload_identity_config {
    workload_pool = "${var.project_id}.svc.id.goog"
  }

  # Enable Network Policy
  network_policy {
    enabled = true
  }

  # Enable IP aliasing
  ip_allocation_policy {
    cluster_ipv4_cidr_block  = "10.0.0.0/16"
    services_ipv4_cidr_block = "10.1.0.0/16"
  }

  initial_node_count = 2

  node_config {
    machine_type = "e2-medium"
    disk_size_gb = 20
    
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]

    # Enable Workload Identity on nodes
    workload_metadata_config {
      mode = "GKE_METADATA"
    }
  }

  depends_on = [google_project_service.container]
}

# Create a service account for ArgoCD
resource "google_service_account" "argocd" {
  account_id   = "argocd-sa"
  display_name = "Service Account for ArgoCD"
}

# Grant necessary IAM roles to the ArgoCD service account
resource "google_project_iam_member" "argocd_roles" {
  for_each = toset([
    "roles/container.admin",
    "roles/iam.serviceAccountUser"
  ])
  
  project = var.project_id
  role    = each.key
  member  = "serviceAccount:${google_service_account.argocd.email}"
}

output "cluster_name" {
  value = google_container_cluster.simple_cluster.name
}

output "cluster_endpoint" {
  value = google_container_cluster.simple_cluster.endpoint
}

output "get_credentials_command" {
  value = "gcloud container clusters get-credentials ${google_container_cluster.simple_cluster.name} --zone ${google_container_cluster.simple_cluster.location}"
}

output "argocd_service_account_email" {
  value = google_service_account.argocd.email
}