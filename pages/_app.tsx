import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CustomizationProvider } from '../context/CustomizationContext';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <CustomizationProvider>
            <Component {...pageProps} />
        </CustomizationProvider>
    );
}

export default MyApp;
