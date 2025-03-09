
# Authentiya - Technical Knowledge Base

## Project Overview

Authentiya is an academic integrity platform designed for educational settings, helping teachers monitor student writing processes and providing students with tools to properly cite sources.

## Architecture

### Frontend Components
- **React**: Core UI library
- **React Router**: Client-side routing
- **TanStack Query**: Data fetching and state management
- **Typescript**: Type safety
- **Tailwind CSS**: Styling
- **Shadcn UI**: UI component library
- **Lucide React**: Icon library
- **Recharts**: Data visualization

### Data Flow
The application follows a unidirectional data flow:
1. User interactions trigger state changes or API calls
2. UI components react to state changes
3. Data is passed down through component props

## Key Features

### Student Experience
- **Writing Interface**: Real-time word count, time tracking
- **Citation Detection**: Prompts for citations when content is pasted
- **Assignment Management**: Link to external LMS assignments
- **Writing Analytics**: Track time spent, words written, citations added

### Teacher Experience
- **Class Management**: View classes and assignments
- **Student Monitoring**: Track student progress in real-time
- **Assignment Analytics**: View class-wide statistics
- **Student Feedback**: Leave comments on student work

## Data Models

### Student Assignment
```typescript
interface StudentAssignment {
  studentId: string;
  assignmentId: string;
  studentName: string;
  status: "not_started" | "in_progress" | "submitted";
  startTime: string | null;
  submissionTime: string | null;
  lastActive: string | null;
  timeSpent: number; // in minutes
  wordCount: number;
  copyPasteCount: number;
  citationCount: number;
  content: string | null;
  comments: Comment[];
}
```

### Assignment
```typescript
interface Assignment {
  id: string;
  title: string;
  className: string;
  dueDate: string;
  totalStudents: number;
  studentsStarted: number;
  studentsSubmitted: number;
  averageTimeSpent: number; // in minutes
  averageWordCount: number;
  createdAt: string;
}
```

### Class Information
```typescript
interface ClassInfo {
  id: string;
  name: string;
  subject: string;
  period: string;
  studentCount: number;
  activeAssignmentCount: number;
}
```

### Comment
```typescript
interface Comment {
  id: string;
  studentId: string;
  assignmentId: string;
  teacherId: string;
  teacherName: string;
  text: string;
  timestamp: string;
  resolved: boolean;
}
```

## Component Structure

### Layout Components
- **Header**: Main navigation and user controls
- **Dashboard**: Container for role-specific dashboards

### Student Components
- **StudentDashboard**: Main student interface
- **AssignmentPrompt**: Assignment details and writing instructions
- **CitationPrompt**: Prompts for proper citations
- **WritingMetrics**: Display writing statistics

### Teacher Components
- **TeacherDashboardWrapper**: Main teacher interface
- **TeacherClasses**: Class listing and management
- **TeacherAssignments**: Assignment listing and management
- **TeacherStudentView**: Individual student work view
- **StudentList**: List of students for an assignment
- **AssignmentStats**: Visualization of assignment metrics

## Routing Structure

- `/`: Landing page
- `/dashboard`: Role-specific dashboard
- `/teacher`: Teacher classes overview
- `/teacher/class/:classId`: Class-specific assignments
- `/teacher/assignment/:assignmentId`: Assignment details and student progress
- `/teacher/student/:studentId/assignment/:assignmentId`: Individual student work

## Authentication & Authorization

Currently, the app uses role switching for demonstration purposes. In production, the system would:
1. Authenticate users via standard OAuth or email/password
2. Authorize based on teacher/student roles
3. Restrict data access based on class enrollment

## Design Tokens

### Color Palette
- **Primary (Maroon)**: `#800020` - Main brand color, used for primary buttons and emphasis
- **Charcoal**: `#2A2D34` - Text and UI elements
- **Accent Cream**: Used for backgrounds in dark mode
- **Success Green**: `#10B981` - Positive actions, completion
- **Info Blue**: `#3B82F6` - Information, in-progress indicators
- **Warning Yellow**: `#F59E0B` - Warnings, attention needed
- **Error Red**: `#EF4444` - Errors, destructive actions

### Typography
- **Headings**: System font stack, semi-bold/bold
- **Body**: System font stack, regular
- **UI Elements**: System font stack, medium

## Best Practices

### Component Design
- Create small, focused components with single responsibilities
- Keep files under 200 lines of code
- Use TypeScript interfaces for all props
- Use destructuring for props
- Provide default values for optional props

### State Management
- Use React hooks for component-level state
- Utilize context for shared state when needed
- Keep state as close to where it's used as possible

### Performance Considerations
- Memoize expensive calculations
- Break large components into smaller pieces
- Use virtualization for long lists

### Accessibility
- Ensure proper contrast ratios for text
- Use semantic HTML elements
- Include proper ARIA attributes
- Ensure keyboard navigation works

## Future Enhancements

### Backend Integration
- Connect to LMS systems via API (Canvas, Blackboard, etc.)
- Implement user authentication and authorization
- Create persistent data storage

### AI Features
- Implement plagiarism detection
- Add writing style analysis
- Provide automated feedback on citations

### Additional Analytics
- Develop heat maps of writing activity
- Create predictive models for at-risk students
- Generate writing improvement suggestions

## Troubleshooting

### Common Issues
- Authentication errors: Check user role setting
- Missing data: Ensure mock data is available for the current view
- Routing issues: Verify route parameters match expected format

### Development Workflow
1. Local development: `npm run dev`
2. Type checking: `npm run tsc`
3. Building: `npm run build`
4. Testing: `npm run test` (once implemented)

---

Last Updated: July 2023
