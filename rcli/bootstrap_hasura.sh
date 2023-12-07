# docker-compose up -d

# Wait for the hasura to be up
bash -c 'while [[ "$(curl http://localhost:8080/healthz)" != "OK" ]]; do sleep 5; done'


# In the advanced version
# we need to get the DB details from
# our backend because the postgres
# endpoint won't be ready by now
# https://stackoverflow.com/questions/13341955/how-to-pass-a-variable-in-a-curl-command-in-shell-scripting
# http://www.compciv.org/topics/bash/variables-and-substitution/


# Connect DB
curl -d '{
  "type": "pg_add_source",
  "args": {
    "name": "postgres",
    "configuration": {
      "connection_info": {
        "database_url": {
          "from_env": "PG_DATABASE_URL"
        },
        "pool_settings": {
          "retries": 1,
          "idle_timeout": 180,
          "max_connections": 50
        }
      }
    }
  }
}
' -H "Content-Type: application/json" \
  -H "X-Hasura-Role: admin" \
  -H "X-hasura-admin-secret: myadminsecretkey" \
  -X POST http://localhost:8080/v1/metadata

# Create users table
curl -d '
    {
        "type": "run_sql",
        "source": "public",
        "args": {
            "source": "postgres",
            "cascade": true,
            "sql": "CREATE TABLE users(id uuid NOT NULL DEFAULT gen_random_uuid(), name text, email text NOT NULL, passwordhash text, PRIMARY KEY (id));"
        }
    }
' -H "Content-Type: application/json" \
  -H "X-Hasura-Role: admin" \
  -H "X-hasura-admin-secret: myadminsecretkey" \
  -X POST http://localhost:8080/v2/query

# create providers table
# with one to many on users
# for various login methods

curl -d '
    {
        "type": "run_sql",
        "source": "postgres",
        "args": {
            "source": "postgres",
            "cascade": true,
            "sql": "CREATE TABLE providers(id uuid NOT NULL DEFAULT gen_random_uuid(), provider text NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, user_id uuid REFERENCES users(id), PRIMARY KEY (id));"
        }
    }
' -H "Content-Type: application/json" \
  -H "X-Hasura-Role: admin" \
  -H "X-hasura-admin-secret: myadminsecretkey" \
  -X POST http://localhost:8080/v2/query

# Track table
curl -d '
    {
        "type":"bulk",
        "source":"postgres",
        "resource_version":2,
        "args":[
            {
                "type":"pg_track_table",
                "args":{
                    "table":{
                        "name":"users",
                        "schema":"public"
                    },
                    "source":"postgres"
                }
            }
        ]
    }
' -H "Content-Type: application/json" \
  -H "X-Hasura-Role: admin" \
  -H "X-hasura-admin-secret: myadminsecretkey" \
  -X POST http://localhost:8080/v1/metadata


# Track table
curl -d '
    {
        "type":"bulk",
        "source":"postgres",
        "resource_version":2,
        "args":[
            {
                "type":"pg_track_table",
                "args":{
                    "table":{
                        "name":"providers",
                        "schema":"public"
                    },
                    "source":"postgres"
                }
            }
        ]
    }
' -H "Content-Type: application/json" \
  -H "X-Hasura-Role: admin" \
  -H "X-hasura-admin-secret: myadminsecretkey" \
  -X POST http://localhost:8080/v1/metadata

# Create array relationship
# providers.user_id -> user.id
# curl -d '
#     {
#       "type": "pg_create_object_relationship",
#       "args": {
#         "source": "postgres",
#         "table": "providers",
#         "name": "user",
#         "using": {
#            "foreign_key_constraint_on": "user_id"
#         }
#       }
#     }
# ' -H "Content-Type: application/json" \
#   -H "X-Hasura-Role: admin" \
#   -H "X-hasura-admin-secret: myadminsecretkey" \
#   -X POST http://localhost:8080/v1/metadata


# Track relationship
curl -d '
    {
        "type":"bulk",
        "source":"postgres",
        "args":[
            {
              "type": "pg_create_object_relationship",
              "args": {
                "source": "postgres",
                "table": "providers",
                "name": "user",
                "using": {
                  "foreign_key_constraint_on": "user_id"
                }
              }
            }
        ]
    }
' -H "Content-Type: application/json" \
  -H "X-Hasura-Role: admin" \
  -H "X-hasura-admin-secret: myadminsecretkey" \
  -X POST http://localhost:8080/v1/metadata