/**
 * main.tsx
 * 
 * This file is the entry point of the application, initializing and rendering the root component.
 * 
 * Programmer: Ellia Morse
 * Date Created: 3/16/2025
 * 
 * Revisions:
 * - 3/16/2025: Initial creation of the file - Ellia Morse
 * 
 * Preconditions:
 * - None identified.
 * 
 * Acceptable Input:
 * - None directly, as this file does not accept parameters.
 * 
 * Postconditions:
 * - Initializes and renders the root component of the application.
 * 
 * Return Values:
 * - None directly, but starts the application.
 */

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
