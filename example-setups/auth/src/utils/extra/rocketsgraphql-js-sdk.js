import RocketsClient from "./RocketsClient"

const createClient = (config) => {
    console.log(config)
    return new RocketsClient(config)
}

export { createClient, RocketsClient };