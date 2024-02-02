import LoginForm from '@/components/auth/loginForm';

export default async function Signup() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-20">
            <LoginForm />
        </main>
    )
}
