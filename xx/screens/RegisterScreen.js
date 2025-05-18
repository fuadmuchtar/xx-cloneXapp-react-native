import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Image,
    Alert
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { gql, useMutation } from '@apollo/client';

const REGISTER = gql`
mutation Mutation($name: String, $username: String, $email: String, $password: String) {
  register(name: $name, username: $username, email: $email, password: $password)
}
`
export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [doRegister, { loading, error }] = useMutation(REGISTER);

    const handleRegister = async () => {
        try {
            const response = await doRegister({
                variables: {
                    name,
                    username,
                    email,
                    password,
                },
            });

            Alert.alert('Registration Success!')
            setName('');
            setUsername('');
            setEmail('');
            setPassword('');
            navigation.navigate('Login');

        } catch (error) {
            Alert.alert(error.message);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Create your account</Text>

                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={[styles.input, errors.name && styles.inputError]}
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                            autoCapitalize="words"
                        />
                        <Text style={styles.characterCount}>{name.length}/50</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Username</Text>
                        <TextInput
                            style={[styles.input, errors.email && styles.inputError]}
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={[styles.input, errors.email && styles.inputError]}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <View style={[styles.passwordContainer, errors.password && styles.inputError]}>
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

                <Text style={styles.termsText}>
                    By signing up, you agree to our <Text style={styles.link}>Terms</Text>,
                    <Text style={styles.link}> Privacy Policy</Text>, and
                    <Text style={styles.link}> Cookie Use</Text>. Xx may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy.
                    <Text style={styles.link}> Learn more</Text>
                </Text>

                <TouchableOpacity
                    style={[styles.registerButton, (!name || !email || !password) && styles.registerButtonDisabled]}
                    onPress={handleRegister}
                    disabled={!name || !email || !password}
                >
                    <Text style={styles.registerButtonText}>Sign up</Text>
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Have an account already? </Text>
                    <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
                        <Text style={styles.loginLink}>Log in</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContent: {
        padding: 20,
        // paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginBottom: 30,
    },
    backButton: {
        padding: 5,
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    formContainer: {
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E1E8ED',
        borderRadius: 5,
        padding: 12,
        fontSize: 16,
    },
    inputError: {
        borderColor: '#E0245E',
    },
    errorText: {
        color: '#E0245E',
        fontSize: 14,
        marginTop: 5,
    },
    characterCount: {
        textAlign: 'right',
        color: '#657786',
        fontSize: 14,
        marginTop: 5,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E1E8ED',
        borderRadius: 5,
        padding: 12,
    },
    passwordInput: {
        flex: 1,
        fontSize: 16,
    },
    dateInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E1E8ED',
        borderRadius: 5,
        padding: 12,
    },
    dateText: {
        fontSize: 16,
    },
    dateHelpText: {
        color: '#657786',
        fontSize: 14,
        marginTop: 5,
    },
    termsText: {
        fontSize: 14,
        color: '#657786',
        lineHeight: 20,
        marginBottom: 30,
    },
    link: {
        color: '#1DA1F2',
    },
    registerButton: {
        backgroundColor: '#000',
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 20,
    },
    registerButtonDisabled: {
        opacity: 0.5,
    },
    registerButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    loginText: {
        color: '#657786',
    },
    loginLink: {
        color: '#1DA1F2',
    },
});