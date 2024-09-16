import { Button, Text, View } from "react-native";
import { useAuth } from "../../hooks/Auth";

export default function Home() {
    const { signOut } = useAuth();
    return (
        <View>
            <Text>Home</Text>
            <Button title="Sair" onPress={() => signOut()} />
        </View>
    );
}