
# Authentiya - Academic Integrity Platform

![Authentiya Logo](./public/logo.png)

## About Authentiya

Authentiya is a browser extension designed to solve the challenge of maintaining academic integrity in an AI-powered world. With the rise of AI tools, schools are increasingly concerned about student learning and potential plagiarism. Authentiya provides a seamless solution that:

- Runs in the background like Grammarly
- Offers real-time tracking of AI usage
- Provides comprehensive reporting at scale
- Integrates with learning management systems

Unlike competitors such as TurnItIn (which works after submission and has accuracy issues) or GPTZero (which lacks LMS integration), Authentiya offers a vigilant and actionable solution that works alongside students and teachers.

## Project Documentation

This project follows strict documentation guidelines to ensure maintainability and knowledge transfer. All code files include:

- Comprehensive prologue comments with file descriptions
- Detailed function and method documentation
- Code block and line-level comments
- Type definitions and interface documentation

For detailed documentation guidelines, see [GUIDELINES.md](./GUIDELINES.md).

## Project Features

- **Student Dashboard**: Track writing progress and manage assignments
- **Document Editor**: Write with real-time tracking and citation support
- **Teacher Dashboard**: Monitor student work and identify potential AI usage
- **Assignment Management**: Create, track, and evaluate student assignments
- **Authentication**: Secure user accounts with role-based access
- **Contact Form**: Request pricing information and customize solutions for your institution

## Technical Details

This project is built with:

- Vite
- TypeScript
- React
- Supabase (Authentication & Database)
- shadcn-ui
- Tailwind CSS

## Development

Follow these steps to run the project locally:

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm i

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start the development server
npm run dev
```

## Environment Variables

Create a `.env.local` file with the following variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deployment

The application can be deployed to any static hosting service that supports Single Page Applications. Recommended options include:

- Vercel
- Netlify
- GitHub Pages

## Contributing

Before contributing to this project, please read the documentation guidelines in [GUIDELINES.md](./GUIDELINES.md).

## License

This project is proprietary and confidential.

## Contact

For more information, visit [authentiya.com](https://authentiya.com) or contact us through the form on the website.
