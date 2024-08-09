import { sql } from '@vercel/postgres';



export async function fetchUserData(userId: bigint): Promise<UserData> {
    try {
        console.log("User id:", userId); // Вывод userData в консоль
      // Преобразуем userId в строку перед использованием в SQL-запросе
      const data = await sql`
        SELECT id, first_name, balance, deposit, accumulation 
        FROM users 
        WHERE id = ${userId.toString()}
      `;
  
      // Проверяем, если пользователь не найден
      if (data.rowCount === 0) {
        throw new Error('User not found');
      }
  
      // Возвращаем первого (и единственного) пользователя в результатах
      const user: UserData = {
        id: BigInt(data.rows[0].id), // Преобразуем ID обратно в bigint
        first_name: data.rows[0].first_name,
        balance: Number(data.rows[0].balance),
        deposit: Number(data.rows[0].deposit),
        accumulation: Number(data.rows[0].accumulation),
      };
  
      return user;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch user data.');
    }
  }
