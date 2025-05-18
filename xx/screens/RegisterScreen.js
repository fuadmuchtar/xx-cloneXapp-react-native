import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Image
} from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RegisterScreen({ navigation }) {
    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState(new Date(2000, 0, 1));
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [errors, setErrors] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);

    // Handle date change
    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setBirthDate(selectedDate);
        }
    };

    // Format date for display
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Validate the form
    const validateForm = () => {
        let newErrors = {};

        if (!name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!email.trim()) {
            newErrors.email = 'Email or phone is required';
        } else if (!/\S+@\S+\.\S+/.test(email) && !/^\+?[0-9]{10,14}$/.test(email)) {
            newErrors.email = 'Enter a valid email or phone number';
        }

        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 13) {
            newErrors.birthDate = 'You must be at least 13 years old';
        }

        if (!password || password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle register button press
    const handleRegister = () => {
        if (validateForm()) {
            console.log('Registration data:', { name, email, birthDate, password });
            // Navigate to next screen or handle registration
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation?.goBack()}
                    >
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={styles.logoContainer}>
                        <AntDesign name="twitter" size={30} color="#1DA1F2" />
                    </View>
                </View>

                {/* Title */}
                <Text style={styles.title}>Create your account</Text>

                {/* Form */}
                <View style={styles.formContainer}>
                    {/* Name Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={[styles.input, errors.name && styles.inputError]}
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                            autoCapitalize="words"
                        />
                        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                        <Text style={styles.characterCount}>{name.length}/50</Text>
                    </View>

                    {/* Email Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email or phone</Text>
                        <TextInput
                            style={[styles.input, errors.email && styles.inputError]}
                            placeholder="Email or phone"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    </View>

                    {/* Birth Date Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Date of birth</Text>
                        <TouchableOpacity
                            style={[styles.dateInput, errors.birthDate && styles.inputError]}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Text style={styles.dateText}>{formatDate(birthDate)}</Text>
                            <Feather name="calendar" size={20} color="#657786" />
                        </TouchableOpacity>
                        {errors.birthDate && <Text style={styles.errorText}>{errors.birthDate}</Text>}
                        <Text style={styles.dateHelpText}>
                            This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.
                        </Text>
                    </View>

                    {showDatePicker && (
                        <DateTimePicker
                            value={birthDate}
                            mode="date"
                            display="default"
                            onChange={onDateChange}
                            maximumDate={new Date()}
                        />
                    )}

                    {/* Password Input */}
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
                        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                    </View>
                </View>

                {/* Terms and Privacy */}
                <Text style={styles.termsText}>
                    By signing up, you agree to our <Text style={styles.link}>Terms</Text>,
                    <Text style={styles.link}> Privacy Policy</Text>, and
                    <Text style={styles.link}> Cookie Use</Text>. Twitter may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy.
                    <Text style={styles.link}> Learn more</Text>
                </Text>

                {/* Register Button */}
                <TouchableOpacity
                    style={[styles.registerButton, (!name || !email || !password) && styles.registerButtonDisabled]}
                    onPress={handleRegister}
                    disabled={!name || !email || !password}
                >
                    <Text style={styles.registerButtonText}>Sign up</Text>
                </TouchableOpacity>

                {/* Login Link */}
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
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
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