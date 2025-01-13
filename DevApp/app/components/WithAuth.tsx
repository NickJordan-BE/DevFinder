import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export function withAuth(Component: React.FC<any>) {
    return function ProtectedRoute(props: any) {
        const { auth } = useAuth();
        const router = useRouter();

        useEffect(() => {
            const checkAuth = async () => {

                if (!auth?.user) {
                    router.push('/login');
                }
            };

            checkAuth();
        }, []);

        return auth?.user ? <Component {...props} /> : null;
    };   
}