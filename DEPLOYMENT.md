# Deployment Guide

## Overview

DocPilot AI consists of three major parts:

- Next.js Frontend
- Express.js Backend
- MongoDB Atlas Database

The recommended deployment architecture is:

Frontend → Vercel

Backend → Render

Database → MongoDB Atlas

---

# Prerequisites

Before deployment ensure:

- GitHub Repository
- MongoDB Atlas Cluster
- Gemini API Key
- Cohere API Key
- Render Account
- Vercel Account

---

# Frontend Deployment

Platform

Vercel

Steps

1. Push the project to GitHub.

2. Login to Vercel.

3. Import the GitHub repository.

4. Configure environment variables.

5. Deploy.

Frontend Environment Variable

NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com

---

# Backend Deployment

Platform

Render

Steps

1. Login to Render.

2. Create a new Web Service.

3. Connect the GitHub repository.

4. Set the backend folder as the Root Directory.

5. Build Command

npm install

6. Start Command

npm start

7. Add Environment Variables.

8. Deploy.

---

# MongoDB Atlas

Create:

- Cluster
- Database User
- Password
- Network Access

Whitelist

0.0.0.0/0

Copy the connection string and configure it inside Render.

---

# Required Environment Variables

PORT

MONGODB_URI

JWT_SECRET

GEMINI_API_KEY

COHERE_API_KEY

---

# Post Deployment Testing

Verify:

✅ Login

✅ Registration

✅ Workspace Switching

✅ Upload PDF

✅ AI Summary

✅ Chat

✅ RAG

✅ Source Citations

✅ Tool Calling

✅ Chat History

✅ Continue Working

✅ Dashboard

---

# Common Issues

## MongoDB SSL

Verify:

- Atlas Network Access
- Connection String
- Database User

---

## Gemini Quota

Free tier requests may become unavailable after exceeding the daily quota.

Retry later or use another API key/project.

---

## File Upload

Verify:

- Upload directory exists
- Render storage limitations
- Environment variables

---

# Future Deployment

Future improvements:

- Docker
- CI/CD
- GitHub Actions
- Nginx Reverse Proxy
- Monitoring
- Automatic Backups