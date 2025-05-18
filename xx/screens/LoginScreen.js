import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
    const [emailUsername, setEmailUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isTrue, setIsTrue] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleUser = async () => {
        setIsTrue(true)
    }

    const handleLogin = async () => {
        console.log("Login")
    }

    if (!isTrue)
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>To get started, first enter your email or @username</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email, or username"
                        onChangeText={(emailUsername) => setEmailUsername(emailUsername)}
                        value={emailUsername}
                    />
                </View>
                <View style={{ alignItems: "flex-end" }}>
                    <TouchableOpacity onPress={handleUser}>
                        <Text style={styles.button}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

    return (
        <View style={styles.container}>
            <View style={{}}>
                <Text style={styles.title}>Enter your password</Text>
            </View>
            <View style={{ flex: 1 }}>
                <TextInput
                    style={styles.input}
                    placeholder="Email, or username"
                    onChangeText={(emailUsername) => setEmailUsername(emailUsername)}
                    value={emailUsername}
                />
                <View>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!passwordVisible}
                        />
                        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                            <Feather name={passwordVisible ? "eye" : "eye-off"} size={20} color="#657786" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View>
                <TouchableOpacity onPress={handleLogin}>
                    <Text style={{
                        fontSize: 20,
                        textAlign: "center",
                        backgroundColor: "black",
                        color: "#fff",
                        padding: 15,
                        borderRadius: 999,
                    }}>Log in</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        marginTop: 10
    },
    input: {
        marginTop: 50,
        borderBottomWidth: 1,
        fontSize: 16,
        paddingVertical: 8,
    },
    button: {
        fontSize: 20,
        width: 80,
        textAlign: "center",
        backgroundColor: "black",
        color: "#fff",
        padding: 10,
        borderRadius: 999,
    },
    passwordContainer: {
        flexDirection: 'row',
        marginTop: 50,
        borderBottomWidth: 1,
        fontSize: 16,
        paddingVertical: 8,
    },
    passwordInput: {
        flex: 1,
        fontSize: 16,
    },
})