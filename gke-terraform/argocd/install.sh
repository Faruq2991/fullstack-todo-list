#!/bin/bash

# Add ArgoCD Helm repository
helm repo add argo https://argoproj.github.io/argo-helm
helm repo update

# Generate a secure password for ArgoCD admin
ADMIN_PASSWORD=$(openssl rand -base64 12)
BCRYPT_PASSWORD=$(htpasswd -bnBC 10 "" $ADMIN_PASSWORD | tr -d ':\n')

# Update the values file with the generated password
sed -i "s|\$2a\$10\$m6Vh0YF8YwXzqXzqXzqXzO|$BCRYPT_PASSWORD|g" values.yaml

# Create namespace for ArgoCD
kubectl create namespace argocd

# Install ArgoCD
helm upgrade --install argocd argo/argo-cd \
  --namespace argocd \
  --values values.yaml \
  --wait

# Wait for the LoadBalancer to get an external IP
echo "Waiting for LoadBalancer to get an external IP..."
while [ -z "$EXTERNAL_IP" ]; do
  EXTERNAL_IP=$(kubectl get svc argocd-server -n argocd -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
  sleep 5
done

echo "ArgoCD has been installed successfully!"
echo "External IP: $EXTERNAL_IP"
echo "Admin password: $ADMIN_PASSWORD"
echo "You can access ArgoCD at: https://$EXTERNAL_IP"
echo "Username: admin"
echo "Password: $ADMIN_PASSWORD" 