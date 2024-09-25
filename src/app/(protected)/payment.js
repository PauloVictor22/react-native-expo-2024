import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function Payment() {
    const [valor, setValor] = useState("0,00");
    const [sugestoes, setSugestoes] = useState([{
        "id": 1,
        "nome": "Travis Dewbury"
    }, {
        "id": 2,
        "nome": "Henrie Ruoss"
    }, {
        "id": 3,
        "nome": "Emmett Felce"
    }, {
        "id": 4,
        "nome": "Michal Lyford"
    }, {
        "id": 5,
        "nome": "Joelle Scragg"
    }, {
        "id": 6,
        "nome": "Tina Loveday"
    }, {
        "id": 7,
        "nome": "Billy Buckwell"
    }, {
        "id": 8,
        "nome": "Jaquith Bacop"
    }, {
        "id": 9,
        "nome": "Paulie Vargas"
    }, {
        "id": 10,
        "nome": "Keri Nornasell"
    }, {
        "id": 11,
        "nome": "Rancell Derx"
    }, {
        "id": 12,
        "nome": "Abbie Tomisch"
    }, {
        "id": 13,
        "nome": "Alfy Insull"
    }, {
        "id": 14,
        "nome": "Lanna Palia"
    }, {
        "id": 15,
        "nome": "Ketty Shorthill"
    }, {
        "id": 16,
        "nome": "Midge Burress"
    }, {
        "id": 17,
        "nome": "Zak Pallin"
    }, {
        "id": 18,
        "nome": "Anett Tieman"
    }, {
        "id": 19,
        "nome": "Ofella Agate"
    }, {
        "id": 20,
        "nome": "Alla Wallach"
    }, {
        "id": 21,
        "nome": "Ange Mushrow"
    }, {
        "id": 22,
        "nome": "Baily Carnie"
    }, {
        "id": 23,
        "nome": "Maximo Bottomley"
    }, {
        "id": 24,
        "nome": "Jeanie Godsal"
    }, {
        "id": 25,
        "nome": "Linc Aronson"
    }, {
        "id": 26,
        "nome": "Sky Goulborn"
    }, {
        "id": 27,
        "nome": "Shelton Dorning"
    }, {
        "id": 28,
        "nome": "Murry McAline"
    }, {
        "id": 29,
        "nome": "Danella Olenchenko"
    }, {
        "id": 30,
        "nome": "Indira Matuskiewicz"
    }, {
        "id": 31,
        "nome": "Grannie Honnicott"
    }, {
        "id": 32,
        "nome": "Diena Cromblehome"
    }, {
        "id": 33,
        "nome": "Etta Bebis"
    }, {
        "id": 34,
        "nome": "Retha Lipgens"
    }, {
        "id": 35,
        "nome": "Fred Eshmade"
    }]);
    const [id, setId] = useState(1);
    const [data, setData] = useState(new Date());
    const [viewCalendar, setViewCalendar] = useState(false);
    const [observacao, setObservacao] = useState("");

    const handleCalendar = (event, selectedDate) => {
        setData(selectadedDate);
        setViewCalendar(false);
    }


    return (
        <View style={styles.content}>
            <Text>Inserir pagamentos</Text>
            <View style={styles.inputView}>
                <Ionicons name="wallet-outline" size={24} color="black" />
                <TextInput placeholder="Valor"
                    keyboardType="decimal-pad"
                    style={styles.inputValor}
                    value={valor}
                    onChangeText={setValor}
                />
            </View>
            <View style={styles.inputView}>
                <Picker
                    selectedValue={id}
                    onValueChange={(itemValue, index) => {
                        setId(itemValue);
                    }}
                    style={{ width: "80%" }}
                >
                    {sugestoes?.map((item) => {
                        return (
                            <Picker.Item key={item.id} label={item.nome} value={item.id} />
                        );
                    })}
                </Picker>
            </View>
            <View style={styles.inputView}>
                <Text onPress={() => setViewCalendar(true)} style={styles.inputData}>
                    {data.toLocaleDateString().split("T")[0]}
                </Text>
                {viewCalendar && (
                    <DateTimePicker
                        value={data}
                        onChange={handleCalendar} mode="date" testID="dateTimePicker" />
                )}
            </View>
            <View style={styles.inputView}>
                <TextInput placeholder="Observações"
                    style={styles.inputObservacao} 
                    value={observacao}
                    onChangeText={setObservacao}
                    multiline={true}
                />
            </View>
            <View style={styles.contentButtoms}>
                <Button title="Salvar" />
                <Button title="Continuar" />
                <Button title="Cancelar" onPress={() => router.back()} />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
    inputView: {
        borderColor: "black",
        borderWidth: 1,
        width: "80%",
        margin: 10,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    contentButtoms: {
        flexDirection: "row",
        justifyContent: "space-around",
        gap: 10,
    },
    inputValor: {
        flex: 1,
        padding: 10,
        textAlign: "right",
    },
    inputData: {
        width: "80%",
        fontSize: 20,
        textAlign: "center",
        fontFamily: "regular",
        padding: 10,
    },
    inputObservacao: {
        fontFamily: "regular",
        fontSize: 20,
        flex: 1,
    },
});
