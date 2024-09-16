import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function About() {
    return (
        <View>
            <Text>Sobre</Text>
            <Button title="Sair" onPress={() => {router.replace("/")}} />
        </View>
    );
}