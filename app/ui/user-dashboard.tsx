import { useEffect, useState } from 'react';
import { fetchUserData } from '@/app/lib/data';

export default function UserDashboard({ userId }: { userId: bigint }) {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData(userId);
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };

    getUserData();
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  let tariffLevel = 1;
  if (userData.deposit >= 5000 && userData.deposit < 25000) {
    tariffLevel = 2;
  } else if (userData.deposit >= 25000) {
    tariffLevel = 3;
  }

  const interestRate = tariffLevel === 1 ? 3 : tariffLevel === 2 ? 4 : 5;

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center bg-gray-100 rounded-full p-8">
        <h1 className="text-4xl font-bold">{tariffLevel} уровень</h1>
      </div>
      <h2 className="text-2xl mt-4">{userData.first_name}</h2>
      <p className="text-xl mt-2">Баланс: {userData.balance}</p>
      <p className="text-lg mt-2">Процент от вклада: {interestRate}%</p>
    </div>
  );
}
