
# Authentiya Development Guidelines

## Code Organization

### Project Structure
```
src/
├── components/       # Reusable UI components
│   ├── common/       # Shared UI elements
│   ├── layout/       # Layout components
│   ├── student/      # Student-specific components
│   ├── teacher/      # Teacher-specific components
│   └── ui/           # Shadcn UI components
├── docs/             # Documentation
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and data
├── pages/            # Page components
│   ├── student/      # Student pages
│   └── teacher/      # Teacher pages
└── ...
```

### File Naming Conventions
- Use PascalCase for React components: `StudentList.tsx`
- Use kebab-case for utility files: `teacher-data.ts`
- Use camelCase for hooks: `useAssignmentData.ts`

## Component Guidelines

### Component Size
- Keep components under 200 lines of code
- If a component exceeds 200 lines, consider refactoring into smaller components
- Extract utility functions if they're not component-specific

### Component Organization
Each component should follow this structure:
```typescript
// 1. Imports
import React from 'react';

// 2. Types
interface MyComponentProps {
  // props definition
}

// 3. Helper functions/constants (if component-specific)
const formatData = (data: any) => {
  // implementation
};

// 4. Component definition
export default function MyComponent({ prop1, prop2 }: MyComponentProps) {
  // 5. Hooks (useState, useEffect, custom hooks)
  
  // 6. Derived state and handlers
  
  // 7. Render
  return (
    // JSX
  );
}
```

### Prop Handling
- Use TypeScript interfaces to define props
- Destructure props in function parameters
- Provide default values for optional props
- Document complex props with comments

```typescript
interface ButtonProps {
  /** The variant determines the button's visual style */
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ 
  variant = 'primary',
  children,
  onClick
}: ButtonProps) {
  // implementation
}
```

## State Management

### Local State
- Use React's `useState` for component-specific state
- Prefer multiple `useState` calls for unrelated state
- Use `useReducer` for complex related state

### Derived State
- Calculate derived state inside the component function
- Memoize expensive calculations with `useMemo`

### Side Effects
- Use `useEffect` for side effects
- Keep effects focused on a single responsibility
- Clean up effects that create subscriptions

## Styling Guidelines

### Tailwind Usage
- Use Tailwind utility classes for all styling
- Group related classes for readability
- Extract common class patterns into component classes

```typescript
// Bad
<div className="p-4 border rounded-md shadow-sm bg-white">

// Better
<div className="p-4 border rounded-md shadow-sm bg-white">

// Best (for repeated patterns)
<div className="card-container">
// With card-container defined in your CSS as a component class
```

### Responsive Design
- Build mobile-first interfaces
- Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`)
- Test all components at multiple viewport sizes

### Color Usage
- Use the defined color palette (see Design Tokens)
- Avoid hardcoded colors - use Tailwind's theme colors
- Ensure sufficient contrast for accessibility

## Performance Optimization

### Memoization
- Use `useMemo` for expensive calculations
- Use `useCallback` for functions passed to child components
- Use `React.memo` for pure components that render often with the same props

### List Rendering
- Add a unique `key` prop when mapping arrays to React elements
- Consider virtualization for long lists
- Avoid creating new arrays in render functions

### Bundle Size
- Import only what you need (e.g., `import { Button } from './components'`)
- Use dynamic imports for code splitting
- Monitor bundle size with tools like `import-cost`

## Testing Guidelines

### Component Testing
- Test each component in isolation
- Focus on user interactions and accessibility
- Use React Testing Library for component tests

### Visual Regression Testing
- Capture screenshots for key components and pages
- Compare screenshots against baselines
- Review visual changes before merging

### User Flow Testing
- Test end-to-end user flows
- Automate common user journeys
- Test error states and edge cases

## Accessibility Standards

### Focus Management
- Ensure all interactive elements are keyboard accessible
- Maintain a logical tab order
- Provide visible focus indicators

### Semantic HTML
- Use appropriate HTML elements (`button`, `a`, etc.)
- Provide meaningful labels for form controls
- Use ARIA attributes when needed

### Color and Contrast
- Maintain WCAG AA contrast ratios (4.5:1 for normal text)
- Don't rely on color alone to convey information
- Test with color blindness simulators

## Code Review Checklist

Before submitting code for review, ensure:

- [ ] Component is under 200 lines
- [ ] Props are properly typed
- [ ] Component follows file organization pattern
- [ ] No console.logs in production code
- [ ] All imports are being used
- [ ] No hardcoded values that should be parameters
- [ ] Component is responsive
- [ ] Accessible to keyboard and screen readers
- [ ] Tests written for key functionality

## Git Workflow

### Branch Naming
- Feature branches: `feature/descriptive-name`
- Bug fixes: `fix/issue-description`
- Refactoring: `refactor/component-name`

### Commit Messages
- Use present tense, imperative style
- Format: `<type>: <description>`
- Types: feat, fix, docs, style, refactor, test, chore

Examples:
```
feat: add student assignment timeline
fix: correct navigation to student view
refactor: extract assignment stats components
```

### Pull Requests
- Keep PRs focused on a single feature or fix
- Include screenshots for UI changes
- Reference related issues
- Add testing instructions if applicable

---

Last Updated: July 2023
