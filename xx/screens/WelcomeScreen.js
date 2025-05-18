import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
    const { navigate } = useNavigation()
    return (
        <View style={styles.container}>
            <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 30, textAlign: "center" }}>See what's happening in the world right now.</Text>
            </View>
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={styles.button} onPress={() => { navigate('Login') }}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <Text style={{ textAlign: "center", margin: 8 }}>or</Text>
                <TouchableOpacity style={styles.button} onPress={() => { navigate('Register') }}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20
    },
    button: {
        backgroundColor: '#000',
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: 'center',
        // marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
})