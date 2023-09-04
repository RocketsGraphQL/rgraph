### Aug 13, 2023
1. Add 2 mins to timeframes
2. Add queries with filtering
3. Human readable timestamps
4. remove @ptr

# ⚓ <a id="my-header"></a> August 1st, 2023 - v0.2.0 stable
## 📢 What’s new?

This is the first stable release of [Rocketgraph](https://rocketgraph.io/). It comes with the following features:

- 🔒 Authentication using email/password
- 👬 Authentication using social logins
- 🪄 Authentication using OTP and magic link
- ⛈️ Server-less functions: Bring your own code and run it as thin AWS lambdas.
- 👨‍💻 Your code will be automatically picked up from your Github commits by our Github bot and deployed as Lambdas
- 🦾 AWS RDS support


### 💻  Brand new Dashboard look
![Kapture 2023-08-02 at 13 30 38](https://github.com/RocketsGraphQL/rgraph/assets/6545467/8082f36b-b70b-42ee-851a-5813d4db985f)

- ⌛ Progress dashboard page that shows the booting stage of the project. While you can browse through an array of resources to get started
- 🎮 Hasura Console with randomly generated password to increase security.
- 🗄️ Postgres Database with randomly generated password. You can `psql` into your db.
- 🤩 AWS RDS support with 20GB Postgres data
- ⚡ Serverless dashboard. Shows all the commits of the repository that you have given access to.
- ⚙️ Settings dashboard. You can integrate social logins, OTP and magic link logins here.

### 🎉 Hasura batteries

- Support for authentication https://github.com/RocketsGraphQL/hasura-batteries/pull/1
- Support for JWT and refresh tokens 
- Automatically refresh JWT tokens every 10 minutes
- Support for authentications using Social login https://github.com/RocketsGraphQL/hasura-batteries/pull/6 https://github.com/RocketsGraphQL/hasura-batteries/pull/15
- OTP login support https://github.com/RocketsGraphQL/hasura-batteries/pull/16
- Magic link login support 
- New docker-compose so you can run it locally as a standalone container alongside Postgres and Hasura 
- Added testing module https://github.com/RocketsGraphQL/hasura-batteries/commit/ee63aa8f005c92bdab166c014103889927fe58ec
- Added CI/CD pipelines https://github.com/RocketsGraphQL/hasura-batteries/commit/ccdad92240daee846c6d03cf01d81140f82599da
- Code Refactor https://github.com/RocketsGraphQL/hasura-batteries/pull/17
- Minor bugfixes

### 🌮 Rocketgraph JS SDKs and react-apollo

- Support to react-apollo for server-side-rendering https://github.com/RocketsGraphQL/react-apollo/commit/83effe63ddb5d401f75d95cb56a5da5eb47f5ce3
- wss for SSL support https://github.com/RocketsGraphQL/react-apollo/commit/4519fc0e6ad2d3b2c501b7aac6a51264f4321b6e
- Support for multiple login methods for rocket-js-sdk https://github.com/RocketsGraphQL/rocket-js-sdk/commit/ac41b2bf06bc85854fded4dd80b66e9f600d4860
- Code refactor for rocketgraph-js-sdk https://github.com/RocketsGraphQL/rocket-js-sdk/commit/23cf2128d144779b9fbdcd5defb0164beae8aacf

### 🔍 Other minor improvements

- Brand new landing page with Next.js App Router
- Blog and documentation updated https://github.com/RocketsGraphQL/blog/commit/f59899140acb9d81c04aee7a7874b42c44b25d58
- New blog: Building a message application with react, ChakraUI and Rocketgraph up https://github.com/RocketsGraphQL/messaging-app
- Github bot to automatically pick up commits from the repository user has given access to https://github.com/settings/apps/codetoawslambda
- Node sandbox for compiling code pulled from Github
- Lambda deployments to convert compiled code to lambda functions
- Privacy page, TOS updated
- New code animations for landing page
- Mobile responsive landing page



