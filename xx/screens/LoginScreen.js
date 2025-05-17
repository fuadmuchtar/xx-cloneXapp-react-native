import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
    const [email, setEmail] = useState("")
    return (
        <View style={styles.container}>
            <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 30, textAlign: "center" }}>See what's happening in the world right now.</Text>
            </View>
            <View style={{ flex: 1 }}>
                <TouchableOpacity>
                    <Text style={styles.button}>Login</Text>
                </TouchableOpacity>
                <Text style={{ textAlign: "center" }}>or</Text>
                <TouchableOpacity>
                    <Text style={styles.button}>Register</Text>
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
        fontSize: 20,
        textAlign: "center",
        backgroundColor: "black",
        color: "#fff",
        padding: 15,
        borderRadius: 999,
    }
})