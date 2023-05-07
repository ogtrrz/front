import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Component() {
    const { data: session, status } = useSession();
    useEffect(() => {
        console.log('session', session);
        console.log('status', status);
    }, [session]);

    if (status === 'authenticated') {
        return <p>Signed in user token {session.user.token}</p>;
    }

    return <a href="http://localhost:3000/api/auth/signin">Sign in</a>;
}
