import { AppProps } from "next/app";
import GlobalStyle from "../types/GlobalStyle";


const app = ({Component, pageProps}: AppProps) => {
    return (
        <>
            <GlobalStyle/>
            <Component {...pageProps}/>
        </>
    );
};

export default app;