import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  ApolloLink,
  createHttpLink,
  split,
  InMemoryCache,
  from,
  HttpLink
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "cache-and-network",
  }
}

export function generateApolloClient({
    auth,
    gqlEndpoint,
    headers,
    publicRole = "public",
    cache,
    connectToDevTools = false,
    onError
  }) {

    const wsUri = gqlEndpoint.startsWith("https")
    ? gqlEndpoint.replace(/^https/, "wss")
    : gqlEndpoint.replace(/^http/, "ws");

    const getheaders = (auth) => {
        // add headers
        const resHeaders = {
          ...headers,
        };
    
        // add auth headers if signed in
        // or add 'public' role if not signed in
        if (auth) {
          if (auth.isAuthenticated()) {
            resHeaders["Authorization"] = `Bearer ${auth.getJWTToken()}`;
            resHeaders["X-Hasura-User-Id"] = `${auth.getUserId()}`;
            resHeaders["X-Hasura-Role"] = "user";
          } else {
            resHeaders["X-Hasura-Role"] = publicRole;
          }
        } else {
          resHeaders["X-Hasura-Role"] = publicRole;
        }

        //resHeaders["X-Hasura-Allowed-Roles"] = headers && headers["X-Hasura-Allowed-Roles"] ? headers["X-Hasura-Allowed-Roles"] : ["user", "public"]
        // resHeaders["X-Hasura-Default-Role"] = resHeaders["X-Hasura-Default-Role"] ? resHeaders["X-Hasura-Default-Role"] : "user"
        return resHeaders;
    };

    const authHeaders = getheaders(auth);
    const authLink = new ApolloLink((operation, forward) => {
        operation.setContext(({ headers }) => ({ headers: {
          ...authHeaders,
        }}));
        return forward(operation);
    });

    const ssr = typeof window === "undefined";
  

    // create ws link
    const wsLink = !ssr
      ? new WebSocketLink({
          uri: wsUri,
          options: {
            reconnect: true,
            lazy: true,
            connectionParams: () => {
              const connectionHeaders = getheaders(auth);
              return {
                headers: connectionHeaders,
              };
            },
          },
        })
      : null;

    // Create an http link:
    const httpLink = new HttpLink({
      uri: gqlEndpoint
    });
    
    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const link = split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      authLink.concat(httpLink),
    )


    const client = new ApolloClient({
        link: from([link]),
        cache: new InMemoryCache(),
    });
    return { client, wsLink };
}

export class RApolloProvider extends React.Component {
    constructor(props) {
        super(props);
        const {
            auth,
            gqlEndpoint,
            headers,
            publicRole = "public",
            cache,
            connectToDevTools,
            onError,
        } = this.props;
        const {client, wsLink} = generateApolloClient({
            auth,
            gqlEndpoint,
            headers,
            publicRole,
            cache,
            connectToDevTools,
            onError,
        });
        this.client = client;
        this.wsLink = wsLink;
        // if (this.props.auth) {
        //   this.props.auth.onTokenChanged(() => {
        //     if (this.wsLink.subscriptionClient.status === 1) {
        //       this.wsLink.subscriptionClient.tryReconnect();
        //     }
        //   });
    
        //   this.props.auth.onAuthStateChanged(async (data) => {
        //     // reconnect ws connection with new auth headers for the logged in/out user
        //     if (this.wsLink.subscriptionClient.status === 1) {
        //       // must close first to avoid race conditions
        //       this.wsLink.subscriptionClient.close();
        //       // reconnect
        //       this.wsLink.subscriptionClient.tryReconnect();
        //     }
        //     if (!data) {
        //       await client.resetStore().catch((error) => {
        //         console.error("Error resetting Apollo client cache");
        //         console.error(error);
        //       });
        //     }
        //   });
        // }
    }
    render() {
        return (
          <ApolloProvider client={this.client}>
            {this.props.children}
          </ApolloProvider>
        );
    }
}