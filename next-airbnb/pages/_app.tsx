import App, { AppContext, AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/Header";
import { wrapper } from "../store";
import { cookieStringToObject } from "../lib/utils";
import axios from "../lib/api";
import { meAPI } from "../lib/api/auth";
import { userActions } from "../store/user";


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


app.getInitialProps = wrapper.getInitialAppProps(store => async (context: AppContext) => {
    const appInitialProps = await App.getInitialProps(context);
    const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
    const {isLogged} = store.getState().user;
    try {
        if (!isLogged && cookieObject.access_token) {
            axios.defaults.headers.common.cookie = cookieObject.access_token;
            const {data} = await meAPI();
            store.dispatch(userActions.setLoggedUser(data));
        }
    } catch (e) {
        console.log(e);
    }
    return {...appInitialProps};
});

export default wrapper.withRedux(app);