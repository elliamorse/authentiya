
# Authentiya - Academic Integrity Platform

**URL**: Built in collaboration with Lovable.dev! edit here: https://lovable.dev/projects/d4855ff7-0d76-4608-a6e3-33aaef944cce

## About Authentiya

Authentiya is a browser extension designed to solve the challenge of maintaining academic integrity in an AI-powered world. With the rise of AI tools, schools are increasingly concerned about student learning and potential plagiarism. Authentiya provides a seamless solution that:

- Runs in the background like Grammarly
- Offers real-time tracking of AI usage
- Provides comprehensive reporting at scale
- Integrates with learning management systems

Unlike competitors such as TurnItIn (which works after submission and has accuracy issues) or GPTZero (which lacks LMS integration), Authentiya offers a vigilant and actionable solution that works alongside students and teachers.

## Project Features

- **Student Dashboard**: Track writing progress and manage assignments
- **Document Editor**: Write with real-time tracking and citation support
- **Teacher Dashboard**: Monitor student work and identify potential AI usage
- **Assignment Management**: Create, track, and evaluate student assignments
- **Citation System**: Add and track citations for various source types
- **Contact Form**: Request pricing information and customize solutions for your institution

## Documentation

This project follows strict documentation standards as outlined in the [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md) file. All code includes:

- Comprehensive prologue comments
- Function and method descriptions
- Block and line documentation
- Error handling documentation
- Known limitations and faults

For contributors, please review the documentation guidelines before submitting code.

## Technical Architecture

This project is built with:

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn-ui component library
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **API Integration**: React Query

## Component Structure

The application follows a modular component structure:

- `/components/common`: Shared UI components
- `/components/student`: Student-specific components
- `/components/teacher`: Teacher-specific components
- `/components/ui`: Base UI components from shadcn-ui
- `/lib`: Utility functions and mock data
- `/pages`: Main route components
- `/contexts`: Application state contexts
- `/hooks`: Custom React hooks
- `/integrations`: External service integrations

## Development

Follow these steps to run the project locally:

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm i

# Start the development server
npm run dev
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

## Contact

For more information, visit [authentiya.com](https://authentiya.com)
