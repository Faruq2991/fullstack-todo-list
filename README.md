# Full-Stack Todo List Application

A modern, full-stack Todo List application built with React, Node.js, and MongoDB, featuring a clean UI and robust backend.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Local Development](#local-development)
- [Docker Setup](#docker-setup)
- [Docker Compose](#docker-compose)
- [Network Configuration](#network-configuration)
- [Security Configuration](#security-configuration)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- Docker
- Docker Compose
- Git
- curl (for testing endpoints)

## Local Development

### Backend Setup
```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd Frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

## Docker Setup

### Building Individual Images

#### Backend Image
```bash
# Navigate to backend directory
cd Backend

# Build the image
docker build -t todo-backend:latest .

# Run the container
docker run -d \
  --name todo-backend \
  -p 5000:5000 \
  -e MONGO_URI=mongodb://mongo:27017/todos \
  -e NODE_ENV=production \
  -e PORT=5000 \
  todo-backend:latest
```

#### Frontend Image
```bash
# Navigate to frontend directory
cd Frontend

# Build the image
docker build -t todo-frontend:latest .

# Run the container
docker run -d \
  --name todo-frontend \
  -p 80:80 \
  -e REACT_APP_API_URL=http://localhost:5000 \
  todo-frontend:latest
```

#### MongoDB Image
```bash
# Pull and run MongoDB
docker run -d \
  --name mongo \
  -p 27017:27017 \
  -v mongo-data:/data/db \
  mongo:latest
```

## Docker Compose

### Building and Running with Docker Compose

1. **Build all services:**
```bash
docker-compose build
```

2. **Start all services:**
```bash
docker-compose up -d
```

3. **View logs:**
```bash
docker-compose logs -f
```

4. **Stop all services:**
```bash
docker-compose down
```

### Docker Compose Configuration

The `docker-compose.yaml` file includes:
- Service definitions for frontend, backend, and MongoDB
- Volume mapping for MongoDB persistence
- Network configuration
- Environment variables
- Health checks

## Network Configuration

### Port Mappings
- Frontend: 80:80
- Backend: 5000:5000
- MongoDB: 27017:27017

### Internal Network
- All services are connected through a custom bridge network
- Services can communicate using service names as hostnames

## Security Configuration

### Environment Variables
Create `.env` files in both Frontend and Backend directories:

#### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://mongo:27017/todos
JWT_SECRET=your_secure_jwt_secret
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
```

### Security Best Practices
1. **Docker Security:**
   - Use non-root users in containers
   - Implement resource limits
   - Regular security updates

2. **Application Security:**
   - Input validation
   - CORS configuration
   - Rate limiting
   - JWT authentication

3. **MongoDB Security:**
   - Authentication enabled
   - Network access restrictions
   - Regular backups

## Deployment

### Kubernetes Deployment
1. **Apply Kubernetes manifests:**
```bash
kubectl apply -f k8s/
```

2. **Verify deployment:**
```bash
kubectl get pods -n todo-app
```

3. **Access the application:**
```bash
kubectl get svc -n todo-app
```

### GKE Deployment
1. **Set up GKE cluster:**
```bash
cd gke-terraform/terraform
terraform init
terraform apply
```

2. **Install ArgoCD:**
```bash
cd gke-terraform/argocd
./install.sh
```

3. **Deploy application:**
```bash
kubectl apply -f k8s/
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Issues:**
   - Check MongoDB service is running
   - Verify connection string
   - Check network connectivity

2. **Container Startup Issues:**
   - Check container logs
   - Verify environment variables
   - Check resource limits

3. **Kubernetes Deployment Issues:**
   - Check pod status
   - View pod logs
   - Check resource availability

### Debug Commands

```bash
# Check container logs
docker logs <container_name>

# Check pod status
kubectl get pods -n todo-app

# View pod logs
kubectl logs <pod-name> -n todo-app

# Check service status
kubectl get svc -n todo-app
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
