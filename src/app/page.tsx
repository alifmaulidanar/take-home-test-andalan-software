'use client';

import { FC } from 'react';
import UsersCard from '@/components/customs/card-templates/card-users';
import LoginCard from '@/components/customs/card-templates/card-login';
import RegisterCard from '@/components/customs/card-templates/card-register';
import ResourcesCard from '@/components/customs/card-templates/card-resources';

const LandingPage: FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Take Home Test - Simple Web App Utilizing Reqres Public API</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Software Developer - Andalan Software</h2>
        <p className="text-xl text-gray-500">Alif Maulidanar</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <RegisterCard />
        <LoginCard />
        <UsersCard />
        <ResourcesCard />
      </div>
    </div>
  );
};

export default LandingPage;
