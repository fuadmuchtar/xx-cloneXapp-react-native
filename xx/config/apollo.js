import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getValueFor } from '../helpers/secureStore';

const httpLink = createHttpLink({
    uri: 'https://23b1-103-136-58-141.ngrok-free.app/'
})

const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = await getValueFor('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;