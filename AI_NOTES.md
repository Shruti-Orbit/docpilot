# AI Collaboration Notes

## Overview

This document explains how AI tools were used during the development of DocPilot AI.

AI was used as a development assistant for brainstorming, debugging, documentation, and implementation suggestions. Every AI-generated suggestion was manually reviewed, tested, modified when necessary, and integrated into the project.

The final architecture, feature integration, debugging, testing, and deployment decisions were completed manually.

---

# AI Tools Used

## 1. ChatGPT

ChatGPT was primarily used for:

- Understanding the assignment requirements
- Explaining Retrieval-Augmented Generation (RAG)
- Explaining Workspace Isolation
- Debugging backend issues
- Reviewing architecture decisions
- Improving documentation
- README preparation
- Deployment guidance

---

## 2. GitHub Codex

GitHub Codex was used for limited implementation assistance such as:

- Chat History integration
- Tool Calling implementation
- MongoDB model generation
- Dashboard utility components

All generated code was manually reviewed before being merged into the project.

---

## 3. Gemini API

Gemini 2.5 Flash is the AI model used by the application itself.

Responsibilities include:

- Document summarization
- Question answering
- RAG-based responses
- Function Calling
- Tool selection
- Final response generation

---

# Manual Development Work

The following work was completed manually:

- Project architecture
- Folder structure
- Authentication flow
- MongoDB schema design
- Workspace architecture
- Dashboard UI
- API integration
- RAG integration
- Testing
- Bug fixing
- Deployment configuration

---

# Challenges Faced

## 1. Embedding Model Compatibility

Initially, the selected embedding model was not supported by the available Gemini API configuration.

Different approaches were evaluated before switching to a compatible embedding solution.

---

## 2. MongoDB Atlas Connectivity

MongoDB Atlas occasionally produced:

- DNS resolution errors
- SSL handshake errors
- Atlas network access issues

The database configuration was corrected after verifying Atlas settings and connection strings.

---

## 3. Gemini API Quota

During development the free Gemini quota was exceeded while testing RAG and Function Calling.

The application was updated to handle quota-related failures more gracefully.

---

## 4. Tool Calling

The initial implementation used backend keyword detection.

After reviewing the assignment requirements, the implementation was replaced with Gemini Function Calling where the model decides whether a tool should be executed.

---

# Testing

Every major feature was manually tested:

- User Registration
- Login
- Workspace Creation
- Workspace Switching
- PDF Upload
- AI Summary
- RAG Retrieval
- Source Citations
- Tool Calling
- Chat History
- Continue Working
- Dashboard

---

# Lessons Learned

This project provided practical experience with:

- Retrieval-Augmented Generation
- Prompt Engineering
- Function Calling
- MongoDB
- Express APIs
- Workspace Isolation
- AI-assisted software development

---

# Future Improvements

Possible future enhancements include:

- Streaming responses
- OCR support
- Hybrid Search
- Retrieval re-ranking
- Multi-document comparison
- Team collaboration
- Shared workspaces
- Better analytics