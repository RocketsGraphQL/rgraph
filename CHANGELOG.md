
### Aug 24, 2023
1. add link to postgres logger on hero page
2. correct dates to logger time selection
3. Remove service linked role and add correct DB parameter group to RDS instance. Add hooks to check instance on every event for the postgresURL

### Aug 16, 2023
1. remove search 
2. Better CSS for Query templates
3. add DB Parameter group to RDS by default

### Aug 15, 2023
1. Add demo URL for public display of Postgres logger
2. change default function name for logs on Backend
3. add demo url to prod env

### Aug 12, 2023
1. Add logging feature for postgres on the frontend
2. Fetch logs from backend.
3. Query templates for logger
4. Code editor for logger queries using Cloudwatch syntax
5. added timeframes for logs

### Aug 13, 2023
1. Add 2 mins to timeframes
2. Add queries with filtering
3. Human readable timestamps
4. remove @ptr

### Aug 10, 2023
1. add basic logging function that queries Cloudwatchlogs and fetches the logs


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

# <a id="my-header"></a>

### Jul 27, 2023

1. Updated Queries and mutations to small cased convention
2. New trail period
3. Change access keys
4. new env variables for serverless

### May 19, 2023
1. add headers to requests
2. Function roles
3. New API endpoints for serverless

### May 18, 2023
1. Registration service for registering endpoints for customer's projects

### May 12, 2023
1. Added hooks for AWS RDS and EC2 booting events
2. Coupled routes based on functionality
3. Changed AWS credentials
3. Project creation workflow

### Apr 25, 2023
1. Added route for instance state update
2. Track RDS events from AWS

### Jul 6, 2022

1. Improved serverless pane
2. Improved general UI
3. Added live payment keys
4. Added live instance update API

* make commits look better
* remove compiled code
* update gitignore
* update template version for new deployments
* add gtag

* fix payments and subscription

* fixes

* checkout page and price update

* Copy to clipboard and Hasura icon

* active state for Hasura icon

* back button

### Jun 1, 2022

Serverless functions and Serverless Github App (#6)
1. integrated github app
2. lists all repos it has access to,
3. handler function for events from Github side

* creates a bucket

* working serverless setup, TODO: test updates to repo and trigger the Github App

* connect github page

* remove compiles

* log error anng go back

1. Add loading state to button
2. Remove unused files
3. Add filename to instance

* tweak webhook endpoint

### Mar 29, 2022

- init monorepo for Frontend
- Support for project creation using docker containers for Postgres, Hasura and Hasura-batteries