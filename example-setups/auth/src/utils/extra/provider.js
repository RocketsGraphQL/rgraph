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
import Cookies from 'js-cookie';
import { setContext } from '@apollo/client/link/context';

// const defaultOptions = {
//   watchQuery: {
//     fetchPolicy: "cache-and-network",
//   }
// }

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
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
        // what are headers?
        console.log("headers are: ", headers);
    
        // add auth headers if signed in
        // or add 'public' role if not signed in
        if (auth) {
          if (auth.isAuthenticated()) {
            resHeaders["Authorization"] = `Bearer ${Cookies.get("jwt")}`;
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

    const authLink = setContext((_, { headers }) => {

      // get the authentication token from local storage if it exists
    
      const token = Cookies.get("jwt");
    
      // return the headers to the context so httpLink can read them
    
      return {
    
        headers: {
    
          ...headers,
    
          authorization: token ? `Bearer ${token}` : "",
          "X-Hasura-Role": "user",

    
        }
    
      }
    
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
        defaultOptions: defaultOptions,
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
        console.log("Link: ");
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
        console.log("Link: ", wsLink);
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