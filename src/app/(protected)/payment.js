import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Payment() {
    return (
        <View>
            <Text>Pagamentos</Text>
            <Button title="Sair" onPress={() => {router.replace("/")}} />
        </View>
    );
}