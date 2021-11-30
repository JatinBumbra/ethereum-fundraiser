import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import { AppState } from '../state';

function MyApp({ Component, pageProps }) {
  return (
    <AppState>
      <Component {...pageProps} />
    </AppState>
  );
}

export default MyApp;
