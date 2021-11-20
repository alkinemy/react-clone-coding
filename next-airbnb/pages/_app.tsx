import { AppProps } from "next/app";
import GlobalStyle from "../types/GlobalStyle";
import Header from "../components/Header";


const app = ({Component, pageProps}: AppProps) => {
    return (
        <>
            <GlobalStyle/>
            <Header/>
            <Component {...pageProps}/>
            <div id="root-modal"/>
        </>
    );
};

export default app;