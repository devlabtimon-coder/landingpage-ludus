import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/figtree';
import '@fontsource/saira/600.css';
import '@fontsource/saira/800.css';
import '@fontsource/saira/900.css';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
