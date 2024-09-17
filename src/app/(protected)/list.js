import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function List() {
    return (
        <View>
        <Text>Listagem</Text>
        <Button title="Sair" onPress={() => {router.replace("/")}} />
    </View>
    );
}