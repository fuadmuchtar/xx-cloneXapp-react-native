import { gql, useMutation } from "@apollo/client";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { save } from "../helpers/secureStore";

const CHECKUSER = gql`
mutation Mutation($input: String) {
  checkUser(input: $input)
}
`
const LOGIN = gql`
mutation Mutation($email: String, $password: String) {
  login(email: $email, password: $password) {
    accessToken
  }
}
`

export default function LoginScreen() {
    const [emailUsername, setEmailUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isTrue, setIsTrue] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { setIsSignedIn } = useContext(AuthContext)
    const [doCheckUser, { loading }] = useMutation(CHECKUSER);
    const [doLogin, { loading: loginLoading }] = useMutation(LOGIN);

    const { navigate } = useNavigation()

    const handleUser = async () => {
        try {
            const response = await doCheckUser({
                variables: {
                    input: emailUsername,
                },
            });
            if (!response.data.checkUser) {
                Alert.alert("Sorry, we couldn't find your account");
                return;
            }
            setIsTrue(true)
        } catch (error) {
            Alert.alert(error.message);
        }
    }

    const handleLogin = async () => {
        try {
            const response = await doLogin({
                variables: {
                    email: emailUsername,
                    password,
                },
            });
            Alert.alert("Login Success!")
            setEmailUsername("")
            setPassword("")

            const token = response.data?.login.accessToken
            if (!token) throw new Error("Invalid token client")
            await save("token", token)
            setIsSignedIn(true)
        } catch (error) {
            Alert.alert(error.message);
        }
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