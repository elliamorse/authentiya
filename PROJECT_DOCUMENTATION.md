
# Authentiya - Project Documentation

## Project Overview

Authentiya is a browser extension and web application designed to help educators monitor student writing processes and authenticate student work. The platform provides tools for monitoring writing time, detecting copy-paste actions, prompting for proper citations, and generating analytics about student writing patterns.

## Key Features

### For Students:
- Link writing sessions to assignments from Learning Management Systems (LMS) like Canvas
- Track writing time, word count, and progress
- Get prompted to cite sources when copy-pasting content
- Submit assignments with proof of authenticity
- View statistics about their writing process

### For Teachers:
- Monitor student writing progress in real-time
- View class-wide analytics about assignment progress and completion
- Identify potential academic integrity issues
- Support students who may be struggling with assignments
- Get insights into student writing patterns and behaviors

## Technical Architecture

### Front-end
- **React**: UI library for building component-based interfaces
- **React Router**: For client-side routing
- **Tailwind CSS**: For styling and responsive design
- **Shadcn UI**: Component library with customizable UI components
- **TanStack Query**: For data fetching and state management
- **Sonner**: Toast notification system
- **Typescript**: Type safety across the application

### Planned Backend (Future Implementation)
- **Canvas API Integration**: For pulling assignment data and submitting work
- **Database**: To store writing metrics, citation records, and user data
- **Authentication**: User management for students and teachers

## Project Structure

```
src/
├── components/
│   ├── common/           # Shared components (Button, Card, etc.)
│   ├── layout/           # Layout components (Header, etc.)
│   ├── student/          # Student-specific components
│   ├── teacher/          # Teacher-specific components
│   └── ui/               # Shadcn UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── pages/                # Page components
│   ├── Dashboard.tsx     # Main dashboard (changes based on user role)
│   ├── Index.tsx         # Landing page
│   └── NotFound.tsx      # 404 page
├── App.tsx               # Main app component with routing
└── index.css             # Global styles
```

## Key Technical Notes

### Copy-Paste Detection
The application uses the `paste` event listener on the document writing area to detect when content is pasted. When a paste event is detected:
1. The pasted text is captured
2. A citation prompt is displayed to the user
3. The copy-paste count is incremented for analytics

### UI Theming
The application uses a maroon and charcoal color palette for an academic feel:
- **Primary (Maroon)**: `#800020` - Used for primary actions, highlighting, and emphasis
- **Secondary (Charcoal)**: `#2A2D34` - Used for text, backgrounds, and secondary elements
- **Accent (Gold)**: `#D4AF37` - Used sparingly for accents and visual interest
- **Neutral Colors**: Cream and gray tones for backgrounds and subtle elements

### Role-based Interface
The application adapts its interface based on the user's role:
- **Student View**: Shows document editing, metrics, and assignment linking
- **Teacher View**: Shows class and assignment analytics, student progress

## Current Implementation Status

### Completed
- Landing page with feature highlights
- Basic dashboard structure for both student and teacher roles
- Writing interface with word count tracking
- Copy-paste detection and citation prompting
- Assignment linking functionality
- Basic writing metrics (time, word count, copy-paste count)

### In Progress / Planned
- Canvas API integration
- Real-time collaboration features
- Advanced analytics for teachers
- Plagiarism detection algorithms
- Mobile-responsive design refinements
- Dark mode implementation
- Unit and integration testing

## Key Technical Decisions

1. **Role Switching for Demo**: The application currently allows users to switch between student and teacher roles for demonstration purposes. In production, this would be replaced with proper authentication.

2. **Local Storage**: User preferences and session data are temporarily stored in localStorage. In production, this would be replaced with a proper backend database.

3. **Modular Component Structure**: The application is built with a highly modular component structure to enable easy extension and maintenance.

4. **Academic Color Palette**: The UI uses a maroon and charcoal color scheme to convey an academic, professional tone appropriate for educational institutions.

5. **Event-based Copy-Paste Detection**: The application uses DOM events to detect copy-paste actions rather than periodic content scanning, which is more efficient and less intrusive.

## Future Roadmap

1. **Authentication System**: Implement proper user authentication and role management
2. **Analytics Dashboard**: Enhance the teacher view with more detailed analytics
3. **LMS Integration**: Implement direct integration with Canvas and other LMS platforms
4. **AI-assisted Citation**: Add AI capabilities to help identify and format citations
5. **Offline Mode**: Allow students to work offline with synchronization when reconnected
6. **Mobile App**: Develop a companion mobile application for on-the-go access

---

Last Updated: June 2023
