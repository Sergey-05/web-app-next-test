import { useEffect, useState } from 'react';
import { fetchUserData } from '@/app/lib/data';

interface UserData {
    id: bigint;
    first_name: string;
    balance: number;
    deposit: number;
    accumulation: number;
}

export default function UserDashboard({ userId }: { userId: bigint }) {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const data = await fetchUserData(userId);
                setUserData(data);
            } catch (error) {
                setError("Failed to fetch user data.");
            } finally {
                setLoading(false);
            }
        };

        getUserData();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!userData) {
        return <div>No user data available.</div>;
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
            <p className="text-xl mt-2">Баланс: {userData.balance.toFixed(2)}</p>
            <p className="text-lg mt-2">Процент от вклада: {interestRate}%</p>
        </div>
    );
}
