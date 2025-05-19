import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Alert
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { deleteValueFor } from '../helpers/secureStore';
import { AuthContext } from '../contexts/AuthContext';

export default function LogoutScreen() {
    const navigation = useNavigation();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { setIsSignedIn } = useContext(AuthContext)


    // Mock user data - in a real app this would come from context/state
    const user = {
        name: 'John Doe',
        handle: '@johndoe',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    };

    const handleLogout = async () => {
        await deleteValueFor('token');
        setIsSignedIn(false);
    };

    const cancelLogout = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={cancelLogout} style={styles.closeButton}>
                    <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
                <AntDesign name="twitter" size={30} color="#1DA1F2" />
                <View style={styles.placeholder} />
            </View>

            <View style={styles.content}>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
                <Text style={styles.title}>Log out of X?</Text>
                <Text style={styles.message}>
                    You can always log back in at any time. If you just want to switch accounts, you can do that by adding an existing account.
                </Text>

                <View style={styles.buttonContainer}>
                    {isLoggingOut ? (
                        <ActivityIndicator size="large" color="#1DA1F2" />
                    ) : (
                        <>
                            <TouchableOpacity
                                style={styles.logoutButton}
                                onPress={handleLogout}
                            >
                                <Text style={styles.logoutButtonText}>Log out</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={cancelLogout}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 40,
        paddingBottom: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: '#E1E8ED',
    },
    closeButton: {
        padding: 5,
    },
    placeholder: {
        width: 24,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 40,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        color: '#657786',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 30,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
    },
    logoutButton: {
        backgroundColor: '#000',
        borderRadius: 50,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 15,
    },
    logoutButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cancelButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E1E8ED',
        borderRadius: 50,
        paddingVertical: 15,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
});