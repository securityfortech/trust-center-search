
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Failed to find the root element");
} else {
  const root = createRoot(rootElement);
  
  try {
    console.log("Mounting React application...");
    root.render(<App />);
    console.log("React application mounted successfully");
  } catch (error) {
    console.error("Failed to render React application:", error);
  }
}
