import { sql } from '@vercel/postgres';

interface UserData {
    id: bigint;
    first_name: string;
    balance: number;
    deposit: number;
    accumulation: number;
}

export async function fetchUserData(userId: bigint): Promise<UserData> {
    try {
        console.log("Fetching user data for ID:", userId.toString());

        // Преобразуем userId в строку перед использованием в SQL-запросе
        const data = await sql`
            SELECT id, first_name, balance, deposit, accumulation
            FROM users
            WHERE id = ${userId.toString()}
        `;

        if (data.rowCount === 0) {
            throw new Error('User not found');
        }

        // Преобразуем данные для возврата
        const user: UserData = {
            id: BigInt(data.rows[0].id),
            first_name: data.rows[0].first_name,
            balance: Number(data.rows[0].balance),
            deposit: Number(data.rows[0].deposit),
            accumulation: Number(data.rows[0].accumulation),
        };

        return user;
    } catch (error) {
        throw new Error(`Failed to fetch user data: ${(error as Error).message}`);
    }
}
