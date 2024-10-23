import { router } from "expo-router";
import { Button, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useRef, useState } from "react";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { z } from "zod";
import { useAuth } from "../../hooks/Auth/index";
import { usePaymentsDatabase } from "../../database/usePaymentsDatabase";
import { useUsersDatabase } from "../../database/useUsersDatabase";



const paymentSchema = z.object({
    valor_pago: z.number().gt(0),
    user_id: z.number().int().positive(),
    user_cadastro: z.number().int().positive(),
    data_pagamento: z.date(),
    observacao: z.string(),
});


export default function Payment() {
    const [valor, setValor] = useState("0,00");
    const [sugestoes, setSugestoes] = useState([]);
    const [id, setId] = useState(1);
    const [data, setData] = useState(new Date());
    const [viewCalendar, setViewCalendar] = useState(false);
    const [observacao, setObservacao] = useState("");
    const valueRef = useRef();
    const { user } = useAuth();
    const { createPayment } = usePaymentsDatabase();
    const { getAllUsers } = useUsersDatabase();

    const handleCalendar = (event, selectedDate) => {
        setData(selectadedDate);
        setViewCalendar(false);
    };

    useEffect(() => {
        valueRef.current.focus();
        try {
            
        } catch (error) {
            
        }
    }, []);

    const handleChanedValor = (value) => {
        try {
            let valorLimpo = value.replace(",", "").replace(".", "");
            let valorConvertido = Number(valorLimpo) / 100;
            if (valorConvertido === 0 || isNaN(valorConvertido)) {
                setValor("0,00");
                return;
            }
            let valorPtBR = Intl.NumberFormat("pt-BR", {
                style: "decimal",
                minimumFractionDigits: 2,
            }).format(valorConvertido);
            setValor(valorPtBR);
        } catch (error) {
            setValor("0,00");
        }
    };

    const convertValue = (value) => {
        try {
            let valorLimpo = value.replace(",", "").replace(".", "");
            let valorConvertido = Number(valorLimpo) / 100;
            if (valorConvertido === 0 || isNaN(valorConvertido)) {
                return 0
            }
            return valorConvertido;
        } catch (error) {
            return valorConvertido;
        }

    }


    const handleSubmit = async () => {
        const payment = {
            user_id: id,
            user_cadastro: Number(user.user.id),
            valor_pago: convertValue(valor),
            data_pagamento: data,
            obervacao,
        };

        try {
            const result = await paymentSchema.parse(payment);
            const { insertedID } = await createPayment(payment);
            console.log(result);
            console.log(insertedID);
        } catch (error) {
            console.log(error);
        }
    };

    return (

        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.content}>
                <Text>Inserir pagamentos</Text>
                <View style={styles.inputView}>
                    <Ionicons name="wallet-outline" size={24} color="black" />
                    <TextInput placeholder="Valor"
                        keyboardType="decimal-pad"
                        style={styles.inputValor}
                        value={valor}
                        onChangeText={(newValue) => handleChanedValor(newValue)}
                        ref={valueRef}
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
        </KeyboardAvoidingView>
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
