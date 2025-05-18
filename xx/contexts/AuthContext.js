import { createContext, useState, useEffect } from 'react';
import { getValueFor } from '../helpers/secureStore';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const checkUserSession = async () => {
            const token = await getValueFor('token');
            if (token) {
                setIsSignedIn(true);
            }
        };
        checkUserSession();
    }, []);

    return (
        <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
            {children}
        </AuthContext.Provider>
    );
}