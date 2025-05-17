import { createStackNavigator } from "@react-navigation/stack"
import LoginScreen from "../screens/LoginScreen"

const Stack = createStackNavigator()
export default function StackNav() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" options={{ title: 'X' }} component={LoginScreen} />
            {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
        </Stack.Navigator>
    )
}