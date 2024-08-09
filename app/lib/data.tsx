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
        
        const data = await sql`
            SELECT id, first_name, balance, deposit, accumulation
            FROM users
            WHERE id = ${userId.toString()}
        `;
  
        if (data.rowCount === 0) {
            throw new Error('User not found');
        }
  
        const user = {
            id: BigInt(data.rows[0].id),
            first_name: data.rows[0].first_name,
            balance: Number(data.rows[0].balance),
            deposit: Number(data.rows[0].deposit),
            accumulation: Number(data.rows[0].accumulation),
        };
  
        console.log("User data fetched:", user);
        return user;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch user data.');
    }
}
