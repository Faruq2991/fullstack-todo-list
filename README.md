<p align="center">
    <img src="https://user-images.githubusercontent.com/62269745/174906065-7bb63e14-879a-4740-849c-0821697aeec2.png#gh-light-mode-only" width="40%">
    <img src="https://user-images.githubusercontent.com/62269745/174906068-aad23112-20fe-4ec8-877f-3ee1d9ec0a69.png#gh-dark-mode-only" width="40%">
</p>

# Full-Stack Todo List Application

This repository hosts a full-stack Todo List application designed to allow users to create, manage, and organize their tasks efficiently. The application features a React-based frontend and a Node.js backend, utilizing MongoDB for data persistence.

## Technologies Used

- **Frontend**: React, Material-UI
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Other Tools**: Vite, React Toastify, Lucide Icons

## Project Structure

The project is divided into two main parts:
- **Frontend**: Located in the `frontend/` directory with its own [README](frontend/README.md).
- **Backend**: Located in the `backend/` directory with its own [README](backend/README.md).

## Features

- Create, view, update, and delete todo items.
- Organize tasks with tags/categories.
- Responsive user interface adaptable to different screen sizes.
- Real-time updates without page reloads.

## Local Development Setup:
``` 
   # Clone the repository (if you haven't already)
   git clone <repository-url>
   cd fullstack-todo-list
   
   # Install dependencies for both frontend and backend
   cd Frontend
   npm install
   
   cd ../Backend
   npm install
```
## Build Docker Images:
```
   # Build frontend image
   cd Frontend
   docker build -t todo-frontend:latest .
   
   # Build backend image
   cd ../Backend
   docker build -t todo-backend:latest .
```
## Set up Google Cloud Project:
```
   # Login to Google Cloud
   gcloud auth login
   
   # Set your project ID
   gcloud config set project YOUR_PROJECT_ID
   
   # Enable required APIs
   gcloud services enable container.googleapis.com
   gcloud services enable compute.googleapis.com
```
## Infrastructure Setup with Terraform:
```
   cd gke-terraform/terraform
   
   # Initialize Terraform
   terraform init
   
   # Create a terraform.tf file with your configuration
   # Required variables:
   # - project_id
   # - region
   # - zone
   
   # Plan the infrastructure
   terraform plan
   
   # Apply the infrastructure
   terraform apply
```
## Configure kubectl:
```
    # Get credentials for your GKE cluster
    gcloud container clusters get-credentials kubernetes_cluster_name --region region
```
## Deploy to Kubernetes:
```
   # Create namespace
   kubectl apply -f k8s/namespace.yaml
   
   # Deploy MongoDB with persistent volume
   kubectl apply -f k8s/mongo-pvc.yaml
   kubectl apply -f k8s/mongo-deployment.yaml
   
   # Deploy Backend
   kubectl apply -f k8s/backend-deployment.yaml
   
   # Deploy Frontend
   kubectl apply -f k8s/frontend-deployment.yaml

   # or simply 
   kubectl apply -f k8s/
```
## Verify Deployment:
```
   # Check if all pods are running
   kubectl get pods -n todo-app
   
   # Get the external IP for the frontend service
   kubectl get svc -n todo-app
```
## Access the Application:
```
Use the external IP address from the frontend service to access the application
The application should be accessible at (http://<EXTERNAL_IP>:80)
```
## Contributing

Contributions are welcome! See the specific README files in the `frontend/` and `backend/` directories for more details on contributing.

## Live Demo

<h4 align="left">Live Preview is available at https://fullstack-todolist-1.onrender.com/</h4>

## Snapshots

<img src="./Frontend/src/assets/home-snapshot.png" alt="home page"/>
