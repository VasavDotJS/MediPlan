# MediPlan - AWS Free Tier Deployment Guide

Follow these simple steps to deploy MediPlan on your AWS account.

### 1. Prerequisites
- AWS Account with Free Tier eligibility.
- AWS CLI installed and configured (`aws configure`).
- Terraform installed.
- SSH Key Pair created in your AWS region (e.g., `mediplan-key`).

### 2. Infrastructure Setup
1.  Navigate to the `infra` directory:
    ```bash
    cd infra
    ```
2.  Initialize Terraform:
    ```bash
    terraform init
    ```
3.  Apply the configuration:
    ```bash
    terraform apply -var="key_name=mediplan-key" -var="db_password=YourSecurePassword123" -var="bucket_name=mediplan-media-unique-id"
    ```
    *Note: Replace variables with your actual values.*

### 3. Application Deployment
1.  SSH into your EC2 instance (get the IP from terraform output):
    ```bash
    ssh -i "mediplan-key.pem" ubuntu@<APP_PUBLIC_IP>
    ```
2.  Clone your repository:
    ```bash
    git clone <YOUR_REPO_URL>
    ```
3.  Set up environment variables in `.env` (using the RDS endpoint from terraform output).
4.  Run the application:
    ```bash
    sudo docker-compose up -d --build
    ```

### 4. Accessing the App
Open your browser and navigate to `http://<APP_PUBLIC_IP>`.

### 5. Cleanup
To avoid costs after your internship, destroy the resources:
```bash
terraform destroy
```
