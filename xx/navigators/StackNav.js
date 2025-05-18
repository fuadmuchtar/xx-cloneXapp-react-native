import { createStackNavigator } from "@react-navigation/stack"
import LoginScreen from "../screens/LoginScreen"
import WelcomeScreen from "../screens/WelcomeScreen"

const Stack = createStackNavigator()
export default function StackNav() {
    const { isSignedIn } = false // Replace with your authentication logic
    return (
        <Stack.Navigator>
            {isSignedIn ? (
                <Stack.Screen name="Home" component={HomeScreen} />
            ) : (
                <>
                    <Stack.Screen name="Welcome" options={{ title: 'X' }} component={WelcomeScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                </>
            )}
        </Stack.Navigator>
    )
}