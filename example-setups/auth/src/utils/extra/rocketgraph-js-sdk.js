import RocketsClient from "./RocketsClient"

const createClient = (config) => {
    return new RocketsClient(config)
}

export { createClient, RocketsClient };