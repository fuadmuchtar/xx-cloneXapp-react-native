import { NavigationContainer } from "@react-navigation/native";
import StackNav from "./navigators/StackNav";
import AuthProvider from "./contexts/AuthContext";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";

export default function App() {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <StackNav />
        </NavigationContainer>
      </ApolloProvider>
    </AuthProvider>
  );
}
