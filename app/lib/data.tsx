import { sql } from '@vercel/postgres';

export async function fetchUserData(userId: number) {
  try {
    const data = await sql`
      SELECT balance, deposit, accumulation 
      FROM users 
      WHERE id = ${userId}
    `;

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user data.');
  }
}