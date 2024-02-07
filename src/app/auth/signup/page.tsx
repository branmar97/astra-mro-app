import SignupForm from '@/components/auth/signupForm';

export default async function Signup() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-20">
            <SignupForm />
        </main>
    )
}
