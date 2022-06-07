const HASURA_QUERY_URL="https://hasura-3tzukfm.rocketgraph.app/v1/query"
const HASURA_GRAPHQL_URL="https://hasura-3tzukfm.rocketgraph.app/v1/graphql"
const BACKEND_URL="https://backend-3TZUKFM.rocketgraph.app/api"

Cypress.Cookies.debug(true) // now Cypress will log when it alters cookies
Cypress.Cookies.defaults({
    preserve: ["jwt", "refresh"],
})


describe('Checks if pages are visitable', () => {
    it('Visits the Signup page', () => {
      cy.visit('http://localhost:3000/signup')
    })
    it('Visits the Login page', () => {
        cy.visit('http://localhost:3000/login')
    })
})

// We don't have a todos table on Hasura, first create one

describe('Creates the todos table on the Hasura endpoint', () => {
    it('Creates the todos table', () => {
        cy.request({
            method: 'POST', 
            url: HASURA_QUERY_URL,
            headers: {
                'Content-Type': 'application/json',
                'X-Hasura-Role': 'admin',
                'X-Hasura-Admin-Secret': 'myadminsecretkey',
            },
            body: {
                "type": "run_sql",
                "source": "postgres",
                "args": {
                  "source": "postgres",
                  "cascade": true,
                  "sql": "CREATE TABLE todos(id UUID NOT NULL DEFAULT gen_random_uuid(), name text, created_at TIMESTAMP DEFAULT now(), is_completed BOOLEAN DEFAULT false, user_id UUID, PRIMARY KEY (id));"
                }
            }
        })
        .should((response) => {
            expect(response.status).to.eq(200)
        })
    })
    it('Tracks the todos table', () => {
        cy.request({
            method: 'POST', 
            url: HASURA_QUERY_URL,
            headers: {
                'Content-Type': 'application/json',
                'X-Hasura-Role': 'admin',
                'X-Hasura-Admin-Secret': 'myadminsecretkey',
            },
            body: {
                "type":"bulk",
                "source":"postgres",
                "resource_version":2,
                "args":[
                    {
                        "type":"track_table",
                        "args":{
                            "table":{
                                "name":"todos",
                                "schema":"public"
                            },
                            "source":"postgres"
                        }
                    }
                ]
            }
        })
        .should((response) => {
            expect(response.status).to.eq(200)
        })
    })
    it('Adds a foreign key constraint to todos table from user_id to users(id)', () => {
        cy.request({
            method: 'POST', 
            url: HASURA_QUERY_URL,
            headers: {
                'Content-Type': 'application/json',
                'X-Hasura-Role': 'admin',
                'X-Hasura-Admin-Secret': 'myadminsecretkey',
            },
            body: {
                "source":"postgres",
                "type": "run_sql",
                "args": {
                    "source":"postgres",
                    "sql": "ALTER TABLE todos ADD FOREIGN KEY (user_id) REFERENCES users(id);"
                }
            }
        })
        .should((response) => {
            expect(response.status).to.eq(200)
        })
    })
})

// First check that features work with user profile

// Set the user profile using the Hasura API

describe('Creates a user role', () => {
    it('Create role: User with insert permissions', () => {
        cy.request({
            method: 'POST', 
            url: HASURA_QUERY_URL,
            headers: {
                'Content-Type': 'application/json',
                'X-Hasura-Role': 'admin',
                'X-Hasura-Admin-Secret': 'myadminsecretkey',
            },
            body: {
                "type" : "create_insert_permission",
                "source":"postgres",
                "args" : {
                    "table" : {
                        "name": "todos",
                        "schema": "public"
                    },
                    "source":"postgres",
                    "role" : "user",
                    "permission" : {
                        "check" : {
                            // "user_id" : "X-HASURA-USER-ID"
                        },
                        "set":{
                            "user_id":"X-Hasura-User-Id"
                        },
                        "columns":["name","is_completed", "id", "created_at", "user_id"]
                    }
                }
            }
        })
        .should((response) => {
            expect(response.status).to.eq(200)
        })
    })
    it('Create role: User with select permissions', () => {
        cy.request({
            method: 'POST', 
            url: HASURA_QUERY_URL,
            headers: {
                'Content-Type': 'application/json',
                'X-Hasura-Role': 'admin',
                'X-Hasura-Admin-Secret': 'myadminsecretkey',
            },
            body: {
                "type" : "create_select_permission",
                "source":"postgres",
                "args" : {
                    "table" : {
                        "name": "todos",
                        "schema": "public"
                    },
                    "source":"postgres",
                    "role" : "user",
                    "permission" : {
                        "check" : {
                            "user_id" : "X-Hasura-User-Id"
                        },
                        "filter": {
                            "user_id" : {
                                "_eq" : "X-Hasura-User-Id"
                            }
                        },
                        "columns":["name","is_completed", "id", "created_at", "user_id"]
                    }
                }
            }
        })
        .should((response) => {
            expect(response.status).to.eq(200)
        })
    })
})

// Create a user to check if the singup works
describe('Creates a user', () => {
    const signup = `${BACKEND_URL}/signup`;
    beforeEach(() => {
        cy.visit('http://localhost:3000/signup')
    })
    it('Creates a user with role User', () => {
        cy.get('#inputUserEmail')
            .should('be.visible')
            .type('kaushik20@cypress.io')
        cy.get('#inputUserPassword')
            .should('be.visible')
            .type('test')
        cy.intercept("POST", "https://backend-3tzukfm.rocketgraph.app/api/signup").as("doSignup")
        cy.get('#signupButton')
            .should('be.visible')
            .click()
        cy.wait("@doSignup").then((interception) => {
            const { response} = interception;
            cy.log(JSON.stringify(response.body));
            const {access, refresh} = response.body;
            cy.setCookie("jwt", access)
            cy.setCookie("refresh", refresh)
        })
        cy.getCookie("jwt").should("exist")
    })
})

// Create a todo using the logged in user profile and
// check that is is being rendered when user is logged in
describe('Creates todos and check that they are visible', () => {
    const query = HASURA_GRAPHQL_URL
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })
    it('Ensures that initially there are no todos', () => {
        cy.contains("no data");
    })
    it('Creates a todo using role: User', () => {
        cy.get('#inputTodo')
            .should('be.visible')
            .type('Cypress.io')
        cy.intercept(query).as("doMutation")
        cy.get('#createTodo')
            .should('be.visible')
            .click({force: true})
        cy.wait("@doMutation")
        cy.wait(5000)
    })
    it("checks that the created todo is visible", () => {
        cy.get('#todosList')
          .should('contain', 'Cypress.io')
    })
    after(() => {
        // Drop table for cleanup
        cy.request({
            method: 'POST', 
            url: HASURA_QUERY_URL,
            headers: {
                'Content-Type': 'application/json',
                'X-Hasura-Role': 'admin',
                'X-Hasura-Admin-Secret': 'myadminsecretkey',
            },
            body: {
                "source":"postgres",
                "type": "run_sql",
                "args": {
                    "source":"postgres",
                    "sql": "DROP TABLE todos"
                }
            }
        })
    })
})
