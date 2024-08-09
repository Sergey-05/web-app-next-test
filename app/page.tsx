'use client';

import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import UserDashboard from "./ui/user-dashboard";

interface UserDataTg {
    id: number;
    first_name?: string;
}

export default function Page() {
    const [userData, setUserData] = useState<UserDataTg | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (WebApp.initDataUnsafe.user) {
                    setUserData(WebApp.initDataUnsafe.user as UserDataTg);
                } else {
                    setError("User data is not available.");
                }
            } catch (err) {
                setError(`Error initializing user data: ${(err as Error).message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <main className="p-4">
            {loading ? (
                <div>Loading user data...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : userData ? (
                <Suspense fallback={<div>Loading user dashboard...</div>}>
                    <UserDashboard userId={BigInt(userData.id)} />
                </Suspense>
            ) : (
                <div>No user data available.</div>
            )}
        </main>
    );
}
