# MediPlan - Secure Healthcare Appointment Booking System
## DevSecOps Capstone Project Report

### 1. Introduction
MediPlan is a cloud-native, secure healthcare application designed to streamline the appointment booking process while adhering to high-tier security standards and DevSecOps best practices.

### 2. Architecture Diagram
The application follows a classic 3-tier architecture:
- **Presentation Layer:** React (Vite) frontend served via Nginx.
- **Application Layer:** Node.js (Express) backend running in Docker containers on AWS EC2.
- **Data Layer:** AWS RDS (MySQL) for structured data and AWS S3 for media/documents.

**Network Architecture:**
- **VPC:** Custom VPC with Public and Private subnets.
- **Security Groups:** Least-privilege rules (e.g., RDS only accepts traffic from the App Server).
- **Public Subnet:** Hosts the App Server and allows Internet Egress.
- **Private Subnet:** Hosts the RDS instance for data isolation.

### 3. Security Implementation
- **Authentication:** JWT-based stateless authentication.
- **Hashing:** Argon2 algorithm for password hashing (superior to bcrypt).
- **Network Security:** VPC isolation, Security Groups, and SSH hardening.
- **App Security:** Helmet.js for security headers, express-rate-limit to prevent Brute-Force, and express-validator for input sanitization.
- **HTTPS/SSL:** Planned for deployment using AWS Certificate Manager and ALB.

### 4. DevOps & Automation
- **Infrastructure as Code:** Terraform modules for reproducible environment setup.
- **Containerization:** Docker and Docker Compose for environment parity.
- **CI/CD:** GitHub Actions for automated building and testing on every push to `main`.
- **Monitoring:** Integrated with AWS CloudWatch for log collection and health alerts.

### 5. Features
- **Patient Dashboard:** View and book appointments.
- **Doctor Dashboard:** Manage patient appointments.
- **RBAC:** Strict Role-Based Access Control implemented via middleware.
- **Beautiful UI:** Responsive design using Tailwind CSS with modern animations.

### 6. Application Screenshots
*(Placeholder: Screenshots would be added here after deployment)*

---
**Prepared by:** Internship Student
**Date:** May 27, 2026
