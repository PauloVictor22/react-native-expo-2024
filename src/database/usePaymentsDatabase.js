import { useSQLiteContext } from "expo-sqlite";

export function usePaymentsDatabase() {
    const database = useSQLiteContext();

    async function createPayment({
        user_id,
        user_cadastro,
        valor_pago,
        data_pagamento,
        observacao,
    }) {
        const statment = await database.prepareAsync(`
            INSERT INTO payments (user_id, user_cadastro, valor_pago, data_pagamento, observacao)
             VALUE ($user_id, $user_cadastro, $valor_pago, $data_pagamento, $observacao);
            `);

        try {
            const result = await statment.executeAsync({
                $user_id: user_id,
                $user_cadastro: user_cadastro,
                $valor_pago: valor_pago,
                $data_pagamento: data_pagamento,
                $observacao: observacao,
            });
            const insertID = result.lastInsertRowId.toString();
            return { insertedID };
        } catch (error) {
            throw error
        } finally {
            await statment.finalizeAsync();

        }
    }

    return { createPayment };
}