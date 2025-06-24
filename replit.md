# 0to1 Automation - Replit Configuration

## Overview

This is a full-stack web application for 0to1 Automation, a business automation services company. The application provides a modern landing page showcasing AI chatbots, email marketing, 3D web development, and growth automation services. Built with React, Express, and PostgreSQL, the system offers both a customer-facing website and backend API for handling contact forms, newsletter subscriptions, and chatbot interactions.

## System Architecture

The application follows a monorepo structure with clear separation between client and server components:

**Frontend Architecture:**
- React 18 with TypeScript for the client-side application
- Vite as the build tool and development server
- Tailwind CSS for styling with dark theme support
- Shadcn/ui component library for consistent UI components
- Framer Motion for animations and 3D effects
- React Query for server state management
- Wouter for client-side routing

**Backend Architecture:**
- Express.js server with TypeScript
- RESTful API endpoints for business logic
- Memory storage with interface for easy database migration
- Session-based request logging and error handling

**Database Architecture:**
- Drizzle ORM with PostgreSQL dialect configured
- Schema includes users, contacts, newsletters, and chat messages tables
- Database migrations managed through Drizzle Kit

## Key Components

### Frontend Components
- **Hero Section**: Landing page with 3D floating elements and call-to-action buttons
- **Services Section**: Showcases AI chatbots, email marketing, 3D web development, and growth automation
- **Interactive Demo**: Placeholder for service demonstrations
- **Contact Form**: Validated form with React Hook Form and Zod schema validation
- **Chatbot Widget**: Floating chat interface for customer interactions
- **Newsletter Subscription**: Email capture component
- **3D Elements**: Custom Three.js components for visual enhancement

### Backend Services
- **Contact Management**: API endpoints for creating and retrieving contact submissions
- **Newsletter Service**: Subscription management for email marketing
- **Chat Service**: Real-time chat message handling with session tracking
- **Storage Layer**: Abstracted storage interface supporting both memory and database implementations

### UI Component System
- **Glass Effect Components**: Modern glassmorphism design elements
- **Service Cards**: Interactive cards with hover animations
- **Form Components**: Validated input fields with error handling
- **Motion Components**: Animated elements using Framer Motion

## Data Flow

1. **User Interaction**: Users interact with the React frontend through forms, buttons, and the chatbot widget
2. **Client Validation**: Form data is validated using Zod schemas on the client side
3. **API Requests**: React Query manages API calls to the Express backend
4. **Server Processing**: Express routes handle business logic and data validation
5. **Data Storage**: Information is stored through the abstracted storage interface
6. **Response Handling**: Success/error responses are displayed to users via toast notifications

## External Dependencies

### UI and Styling
- **Radix UI**: Headless UI components for accessibility and customization
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Icon library for consistent iconography
- **Framer Motion**: Animation library for smooth transitions and 3D effects

### Development and Build Tools
- **Vite**: Fast development server and build tool
- **TypeScript**: Type safety across the entire application
- **ESBuild**: Fast bundling for production builds
- **PostCSS**: CSS processing with Tailwind integration

### Backend Services
- **Drizzle ORM**: Type-safe database operations
- **Neon Database**: Serverless PostgreSQL (configured but not yet implemented)
- **Express Session**: Session management for user tracking
- **Zod**: Runtime validation for API endpoints

## Deployment Strategy

The application is configured for deployment on Replit with the following setup:

**Development Environment:**
- Node.js 20 runtime with web and PostgreSQL modules
- Hot reload development server on port 5000
- Vite dev server for frontend with HMR support

**Production Build:**
- Vite builds the client to `dist/public`
- ESBuild bundles the server to `dist/index.js`
- Static file serving through Express
- Auto-scaling deployment target

**Database Strategy:**
- PostgreSQL 16 module configured in Replit
- Drizzle migrations ready for database schema deployment
- Environment variable configuration for database URL
- Fallback to memory storage during development

## Recent Changes

- June 24, 2025: Removed stats section from hero area for cleaner design
- June 24, 2025: Updated testimonial names to Vivek Patel, Maria Mecwan, and Tanish Thakur
- June 24, 2025: Changed contact email from hello@0to1automation.com and support@0to1automation.com to dascam099@gmail.com
- June 24, 2025: Updated phone number from +1 (555) 123-4567 to +1 (437) 243-4197
- June 24, 2025: Replaced Twitter social media button with WhatsApp button in footer

## Changelog

- June 24, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.