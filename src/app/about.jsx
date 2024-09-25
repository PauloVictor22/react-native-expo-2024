import { router } from "expo-router";
import { Button, Image, Text, View } from "react-native";

export default function About() {
    return (

        <View style={{backgroundColor: "f0f0f0"}}>
        <View>
            <Image source={require("../assets/img/ep.jpg")} style={{
                width: 200, height: 200,
                borderRadius: 100,
                alignSelf: "center",
                zoom: 4, 
            }}
            />
            <Text style={{
                marginTop: 20, fontSize: 20,
                textAlign: "center",
                fontFamily: "bold"
            }
            }>
                    Meu nome é Paulo Victor Amaral Lopes, tenho 16 anos e sou estudante da ETEC,
              atualmente cursando informática no 2º ano de curso.
                    Gosto de ouvir música e tocar guitarra, atualmente em busca de formar uma banda.
            </Text>
            <Button title="Sair" onPress={() => { router.replace("/") }} />
        </View>
        </View>

    );
}