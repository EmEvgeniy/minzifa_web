'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '../../store/useAuthStore';
import Button from '@/components/UI/Button/Button';
import { Popup } from '@/components/UI/Popup';
import { FaTimes } from 'react-icons/fa';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export const AuthPopup = () => {
    const t = useTranslations();
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { authPopupOpen, closeAuthPopup, isAuthenticated } = useAuthStore();

    // Эффект для обработки успешной регистрации
    useEffect(() => {
        if (isAuthenticated) {
            setIsLogin(true); // Переключаемся на форму логина после успешной регистрации
        }
    }, [isAuthenticated]);

    const handleClose = () => {
        setIsLogin(true);
        setShowPassword(false);
        setShowConfirmPassword(false);
        closeAuthPopup();
    };

    const popupContent = (
        <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#16372D]">{t('auth.title')}</h2>
            </div>

            {/* Tab buttons */}
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                <Button
                    onClick={() => setIsLogin(true)}
                    color={isLogin ? 'white' : 'light'}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${isLogin ? 'text-[#16372D]' : 'text-gray-600 hover:text-gray-900'}`}
                >
                    {t('auth.login.title')}
                </Button>
                <Button
                    onClick={() => setIsLogin(false)}
                    color={!isLogin ? 'white' : 'light'}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${!isLogin ? 'text-[#16372D]' : 'text-gray-600 hover:text-gray-900'}`}
                >
                    {t('auth.register.title')}
                </Button>
            </div>

            {isLogin ? (
                <LoginForm
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                />
            ) : (
                <RegisterForm
                    showPassword={showPassword}
                    showConfirmPassword={showConfirmPassword}
                    setShowPassword={setShowPassword}
                    setShowConfirmPassword={setShowConfirmPassword}
                />
            )}
        </div>
    );

    return (
        <Popup
            open={authPopupOpen}
            handleClose={handleClose}
            content={popupContent}
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
};