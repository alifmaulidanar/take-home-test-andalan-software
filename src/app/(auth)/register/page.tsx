"use client";

import { useState } from "react";
import { registerUser } from "../lib/data";
import { useRouter } from "next/navigation";
import { RegisterForm } from "@/components/customs/register-form";
import BackHomeButton from "@/components/customs/buttons/back-home-button";

const RegisterPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const result = await registerUser(email, password);

      if ('token' in result) {
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid h-screen w-full items-start justify-center px-4">
      <div className="grid h-full items-end">
        <BackHomeButton />
      </div>
      <RegisterForm success={successMessage} onRegister={handleRegister} isLoading={isLoading} error={error} />
    </div>
  );
};

export default RegisterPage;
