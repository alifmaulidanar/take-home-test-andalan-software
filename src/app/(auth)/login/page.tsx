"use client";

import { useState } from "react";
import { loginUser } from "../lib/data";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/customs/login-form";
import BackHomeButton from "@/components/customs/buttons/back-home-button";

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const result = await loginUser(email, password);

      if ('token' in result) {
        setSuccessMessage("Login successful!");
        setTimeout(() => {
          router.push("/users");
        }, 2000);
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error(err)
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid h-screen w-full items-start justify-center px-4">
      <div className="grid h-full items-end">
        <BackHomeButton />
      </div>
      <LoginForm success={successMessage} onLogin={handleLogin} isLoading={isLoading} error={error} />
    </div>
  );
};

export default LoginPage;
