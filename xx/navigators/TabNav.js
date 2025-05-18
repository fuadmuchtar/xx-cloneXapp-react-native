import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import { Feather } from '@expo/vector-icons';
import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();

export default function TabNav() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Homes') {
                        iconName = 'home';
                    } else if (route.name === 'Search') {
                        iconName = 'search';
                    } else if (route.name === 'Profile') {
                        iconName = 'user';
                    }

                    // Return the icon component
                    return <Feather name={iconName} size={size} color={focused ? "#1DA1F2" : "#657786"} />;
                },
                tabBarShowLabel: false,
            })}
        >
            <Tab.Screen name="Homes" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />

        </Tab.Navigator>
    );
}