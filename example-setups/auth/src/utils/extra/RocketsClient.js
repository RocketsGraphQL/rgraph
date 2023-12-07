import RocketsAuth from "./RocketsAuth"

export default class RocketsClient{

    constructor(config) {
        if (!config.baseURL) {
            throw "Please specify a baseURL. More information at https://rocketsgraphql.com/docs/libraries/rockets-js-sdk#setup.";
        }
        
        this.baseURL = config.baseURL;
        console.log(this.baseURL);

        this.auth = new RocketsAuth({
            baseURL: config.baseURL,
        })

        if (this.auth.isAuthenticated()) {
            // if this is authenticated, keep refreshing tokens
            this.auth.refresh()
            setTimeout(() => this.auth.refresh(), 5 * 60)
        }
    }
}