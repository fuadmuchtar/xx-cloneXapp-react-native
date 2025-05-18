import { createStackNavigator } from "@react-navigation/stack"
import LoginScreen from "../screens/LoginScreen"
import WelcomeScreen from "../screens/WelcomeScreen"
import TabNav from "./TabNav"
import TweetScreen from "../screens/TweetScreen"
import ProfileScreen from "../screens/ProfileScreen"
import TweetDetailScreen from "../screens/TweetDetailScreen"
import RegisterScreen from "../screens/RegisterScreen"
import { AuthContext } from "../contexts/AuthContext"
import { useContext } from "react"

const Stack = createStackNavigator()
export default function StackNav() {
    const { isSignedIn } = useContext(AuthContext)
    return (
        <Stack.Navigator>
            {isSignedIn ? (
                <>
                    <Stack.Screen name="Home" options={{ headerShown: false }} component={TabNav} />
                    <Stack.Screen name="Tweet" options={{ headerShown: false }} component={TweetScreen} />
                    <Stack.Screen name="Profile" options={{ headerShown: false }} component={ProfileScreen} />
                    <Stack.Screen name="TweetDetail" options={{ headerShown: false }} component={TweetDetailScreen} />
                </>
            ) : (
                <>
                    <Stack.Screen name="Welcome" options={{ title: 'XX' }} component={WelcomeScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </>
            )}
        </Stack.Navigator>
    )
}