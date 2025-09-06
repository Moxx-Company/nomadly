# Project Documentation

## Overview

This appears to be a web application called "Nomadly" that provides domain and hosting services with integrated payment processing, SMS capabilities, and reseller functionality. The system supports multiple payment gateways including cryptocurrency payments, bank transfers, and various third-party payment processors. It includes features for domain management, subscription plans, and communication services.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Core Application Structure
- **JavaScript/Node.js Backend**: Built using modern ES2021 standards with ESLint configuration for code quality
- **Multi-Service Architecture**: Integrates various external APIs and services for different functionalities
- **Environment-Based Configuration**: Extensive use of environment variables for API keys and configuration management

### Payment Processing System
- **Multi-Gateway Support**: Integrates multiple payment processors including Fincra, DynoPay, and BlockBee for cryptocurrency
- **Flexible Payment Options**: Supports bank payments, cryptocurrency payments, and traditional payment methods
- **Subscription Management**: Implements tiered pricing with daily, weekly, and monthly subscription plans

### Domain and Hosting Services
- **Domain Management**: Connects to external domain services through reseller APIs
- **Hosting Integration**: Links to Railway and Render services for hosting provisioning
- **Automated Provisioning**: Uses Connect Reseller API for domain registration and management

### Communication Services
- **SMS Integration**: SignalWire API integration for SMS messaging capabilities
- **Email Services**: Brevo SMTP integration for transactional emails
- **Customer Support**: Telegram integration for customer support channels

### Feature Management
- **Subscription Tiers**: Different feature limits based on subscription levels (free domains per plan)
- **Feature Toggles**: Environment-controlled feature enabling/disabling (SMS app, bank payments, reseller features)
- **Demo Integration**: YouTube demo links for user onboarding

## External Dependencies

### Payment Gateways
- **Fincra**: Primary payment processor with webhook support
- **DynoPay**: Alternative payment processing with wallet functionality
- **BlockBee**: Cryptocurrency payment processing (optional)

### Communication Services
- **SignalWire**: SMS and voice communication API
- **Brevo (formerly Sendinblue)**: Email delivery service
- **Telegram**: Customer support integration

### Domain and Hosting
- **Connect Reseller API**: Domain registration and management
- **Railway**: Cloud hosting platform integration
- **Render**: Additional hosting service integration
- **Nameword API**: Domain-related services

### Utility Services
- **OpenAI API**: AI-powered features integration
- **Neutrino API**: Phone number validation and verification
- **Bitly & Cuttly**: URL shortening services
- **Currency Exchange API**: Real-time currency conversion

### Infrastructure
- **VS Code**: Development environment with custom spell-check dictionary
- **ESLint**: Code quality and standards enforcement
- **Environment Variables**: Comprehensive configuration management for API keys and service endpoints