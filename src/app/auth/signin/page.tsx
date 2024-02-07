import SignInForm from '@/components/auth/signinForm';

export default async function Signup() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-20">
            <SignInForm />
        </main>
    )
}
