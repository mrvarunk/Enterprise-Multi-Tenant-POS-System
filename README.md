# Enterprise Multi-Tenant POS Platform

A production-ready, multi-tenant Point of Sale SaaS platform built with Spring Boot and React. Engineered for high availability, strict data isolation, and enterprise-grade security.

### 🔗 Live Demo
* **Frontend Application:** https://enterprise-multi-tenant-pos-system.vercel.app/


*(Note: The backend is hosted on a free Render tier and may take 30-50 seconds to spin up on the initial request. Please be patient!)*

### 🔐 Test Credentials
Experience the multi-tenant data isolation and Role-Based Access Control (RBAC) by logging in as different users:

**Tenant 1: Main Branch**
* **Cashier:** `cashier@pos.com` | Password: `cashier123`
* **Admin:** `admin@pos.com` | Password: `admin123`



---

## 🚀 Enterprise Architecture & Features

* **Multi-Tenancy & Data Isolation:** Implemented a robust multi-tenant architecture ensuring strict data isolation across different business branches.
* **Security & IDOR Prevention:** Secured via Spring Security and stateless JWTs. Explicit RBAC scopes completely eliminate Insecure Direct Object Reference (IDOR) vulnerabilities.
* **Asynchronous Audit Logging:** Engineered a non-blocking tracking system using Spring AOP and PostgreSQL JSONB, offloading contextual metadata to a dedicated thread pool to protect core transaction latency.
* **High-Performance Caching:** Integrated a Redis caching layer to optimize high-frequency product catalog reads and drastically reduce database overhead.
* **Modern UI/UX:** Built a low-latency React frontend featuring Redux Toolkit state management and a responsive Bento-grid dashboard.
* **Fully Automated CI/CD:** Containerized with Docker and deployed via a comprehensive GitHub Actions CI/CD pipeline to Vercel (Frontend) and Render (Backend).

## 🛠️ Tech Stack
* **Backend:** Java 17, Spring Boot, Spring Security (JWT), Spring AOP
* **Frontend:** React, Vite, Redux Toolkit, Tailwind CSS
* **Database & Caching:** PostgreSQL, Redis
* **DevOps & Deployment:** Docker, GitHub Actions, Vercel, Render
