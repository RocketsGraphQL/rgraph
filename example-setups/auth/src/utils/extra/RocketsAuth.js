
import axios from "axios";
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;

window.addEventListener('load', (event) => {
    console.log('page is fully loaded', window.location.href);
});

(async () => {
    if (window.location.href == Cookies.get('githubRedirectUrl')) {
        const cookies = await axios.get(Cookies.get("api_url")+ "/tokens");
        const { access, refresh } = cookies.data;
        Cookies.set("jwt", access, { expires: 7 });
        Cookies.set("refresh", refresh, { expires: 7 });
    }
})().catch(err => {
    console.error(err);
});


export default class Auth {
    constructor(config) {
        const { baseURL } = config;
        this.baseURL = baseURL;
    }
    async login ({email, password, provider} = {}) {
        if (provider == "local") {
            const login = await axios.post(this.baseURL+"/signin", {
                email: email,
                password: password,
            })
            const {jwt, refresh} = login.data;
            Cookies.set("jwt", jwt, { expires: 7 });
            Cookies.set("refresh", refresh, { expires: 7 });
            return true;
        }
    }
    async signIn ({email, password, provider} = {}) {
        switch (provider) {
            case "github":
                // first get the redirect URL
                // and provider URL
                console.log("getting github client test", this.baseURL);
                const client = await axios.get(this.baseURL+"/github/client")
                console.log("client: ", client)
                const {ProviderUrl, RedirectUrl} = client.data;
                // create a listener to update
                // cookies when redirectURL is reached
                Cookies.set("githubRedirectUrl", RedirectUrl);
                Cookies.set("api_url", this.baseURL);
                return {success: true, redirectUrl: RedirectUrl, providerUrl: ProviderUrl}
            default:
                const login = await axios.post(this.baseURL+"/signin", {
                    email: email,
                    password: password,
                })
                const {jwt, refresh} = login.data;
                Cookies.set("jwt", jwt, { expires: 7 });
                Cookies.set("refresh", refresh, { expires: 7 });
                return {success: true};
        }
    }
    logout () {
        Cookies.remove("jwt");
        Cookies.remove("refresh");
    }
    async register ({email, password}) {
        const signup = await axios.post(this.baseURL+"/signup", {
            email: email,
            password: password,
        })
        const {jwt, refresh} = signup.data;
        Cookies.set("jwt", jwt, { expires: 7 });
        Cookies.set("refresh", refresh, { expires: 7 });
        return true;
    }
    async refresh() {
        const refreshResp = await axios.post(this.baseURL+"/refresh-token", {
            access: Cookies.get("jwt"),
            refresh: Cookies.get("refresh"),
        })
        const {jwt, refresh} = refreshResp;
        Cookies.set("jwt", jwt, { expires: 7 });
        Cookies.set("refresh", refresh, { expires: 7 });
        return true;
    }
    async setUser() {
        const cookies = await axios.get(this.baseURL + "/tokens");
        const { jwt, refreshToken } = cookies.data;
        Cookies.set("jwt", jwt, { expires: 7 });
        Cookies.set("refresh", refreshToken, { expires: 7 });
    }
    getJWTToken () {
        return Cookies.get("jwt");
    }
    getUserId () {
        return Cookies.get("user_id");
    }
    isAuthenticated () {
        if (Cookies.get("jwt")) {
            return true;
        }
        return false;
    }
}