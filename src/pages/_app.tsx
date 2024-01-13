// src/pages/_app.tsx

import { AppProps } from 'next/app';
import { BrowserRouter as Router } from 'react-router-dom';
// import '../styles/globals.css'; // Import your global styles here

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Router>
      <Component {...pageProps} />
    </Router>
  );
}

export default MyApp;