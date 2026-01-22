'use client';

import { useAuthStore } from '@/store';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Popup } from '../UI';
import Button from '../UI/Button/Button';
import { AuthStep } from './_types';
import { ForgotPasswordForm } from './Forms/ForgotPasswordForm';
import { LoginForm } from './Forms/LoginForm';
import { RegisterForm } from './Forms/RegisterForm';
import WelcomeForm from './Forms/WelcomeForm';

export function AuthPopup() {
    const searchParams = useSearchParams();

    const { authPopup, setAuthPopup } = useAuthStore();

    const [step, setStep] = useState<AuthStep>('welcome');

    useEffect(() => {
        const requireAuth = searchParams.get('require-auth');
        const resetPassword = searchParams.has('reset-password');

        if (requireAuth === '1') {
            setAuthPopup(true);

            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete('require-auth');
            window.history.replaceState({}, '', newUrl);
        }

        if (resetPassword) {
            setAuthPopup(true);
            setStep('forgot-password');
        }
    }, [searchParams, setAuthPopup]);

    const handleClose = () => {
        setAuthPopup(false);
    };

    if (!authPopup) return null;

    return (
        <Popup
            open={authPopup}
            handleCloseAction={handleClose}
            content={(
                <div className='relative bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto'>
                    {step === 'welcome' ? <WelcomeForm step={step} setStep={setStep} /> :
                        step === 'register' ? <RegisterForm setStep={setStep} /> :
                            step === 'forgot-password' ? <ForgotPasswordForm setStep={setStep} /> :
                                step === 'login' ? <LoginForm step={step} setStep={setStep} /> :
                                    null
                    }
                </div>
            )}
            className="w-full max-w-md"
            timesButton={
                <Button
                    onClick={handleClose}
                    color="link"
                    className="text-gray-500 hover:text-gray-700 p-0 h-auto min-h-0 absolute top-4 right-4 z-10"
                >
                    <FaTimes size={16} />
                </Button>
            }
        />
    );
}
