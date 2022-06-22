import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: "https://api-sa-east-1.graphcms.com/v2/cl4oxjdrk183501xx7mzv6r7o/master",
    cache: new InMemoryCache()
});