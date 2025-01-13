'use client'
import { createContext, FC, useContext, useState } from "react";
import { User } from '../../server/models/user';

export interface Auth {
    accessToken: string;
    user: User | null;
}

const AuthContext = createContext<{
    auth: Auth | null;
    setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
}>({
    auth: null,
    setAuth: () => {},
});

export const useAuth = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return authContext;
}

export const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<Auth | null>(null);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;