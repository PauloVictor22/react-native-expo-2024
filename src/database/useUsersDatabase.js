import { useSQLiteContext } from "expo-sqlite";

export function useUsersDatabase() {
    const database = useSQLiteContext();

    async function authUser({ email, password }) {
        console.log("authUser email: ", email, "password: ", password);
        try {
            const result = await database.getFirstAsync(`
                SELECT id, nome, email, role FROM users WHERE email= '${email}' and senha='${password}'
            `);
            return result;
        } catch (error) {
            console.error("useUsersDatabase authUser error: ", error);
            throw error;
        }
    }

    //  user_id INTEGER NOT NULL,
    //  user_cadastro INTEGER NOT NULL,
    //  valor_pago REAL NOT NULL,
    //  data_pagamento DATE NOT NULL,
    //  observacao TEXT,


    async function create({
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

    return {
        authUser,
    };
}