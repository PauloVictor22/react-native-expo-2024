import { createContext, useContext, useEffect, useState } from "react";
import { authUser, useUsersDatabase } from "../../database/useUsersDatabase";
import AsyncStorage from "@react-native-async-storage/async-storage";


const AuthContext = createContext({});


export const Role = {
    SUPER: "SUPER",
    ADM: "ADM",
    USER: "USER"
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState({
        autenticated: null,
        user: null,
        role: null,
    });

    const { authUser } = useUsersDatabase();

    useEffect(() => {
        const loadStoragedData = async () => {
            const storagedUser = await AsyncStorage.getItem("@payment:user");
            if (storagedUser) {
                setUser({
                    autenticated: true,
                    user: JSON.parse(storagedUser),
                    role: JSON.parse(storagedUser).role,
                });
            } else {
                setUser({
                    autenticated: false,
                    user: null,
                    role: null,
                });
            }
        };
        loadStoragedData();
    }, []);

    useEffect(() => {
        console.log("AuthProvider", user);
    }, [user])

    const signIn = async ({ email, password }) => {
        const response = await authUser({ email, password });

        if (!response) {
            setUser({
                autenticated: false,
                user: null,
                role: null,
            });
            throw new Error("Usuário ou senha inválidos");
        }

        await AsyncStorage.setItem("@payment:user", JSON.stringify(response));

        setUser({
            autenticated: true,
            user: response,
            role: response.role,
        });
    };

    const signOut = async () => {
        await AsyncStorage.removeItem("@payment:user");
        setUser({});
    };

    useEffect(() => {
        console.log("AuthProvider", user);
    }, [user]
    );



    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}