'use client';

import { useAuthPostMutation } from "@/api/post.api";
import { useAuthStore } from "@/store";
import { useTranslations } from "next-intl";
import { GoogleLoginButton } from "./GoogleLoginButton";
import Button from "@/components/UI/Button/Button";
import { Input } from "@/components/UI/Form";
import Loader from "@/components/UI/Loader/Loader";
import { FaCalendarCheck, FaCrown } from "react-icons/fa6";
import { cn } from "@/utils";
import { AuthStep } from "../_types";

export default function WelcomeForm({ step, setStep }: { step: AuthStep, setStep: (step: AuthStep) => void }) {
    const t = useTranslations();
    const { email, setEmail } = useAuthStore();

    const { mutate: checkEmailMutate, isPending } = useAuthPostMutation<{ status: string }, { email: string }>(
        ['auth.check-email'],
        (data) => {
            if (data.status === 'ok') {
                setStep('login');
            } else {
                setStep('register');
            }
        },
        (error) => {
            console.error(error);
        }
    );

    const handleCheckEmail = async () => {
        await checkEmailMutate({
            obj: { email },
            endpoint: 'auth/check-email',
        });
    };

    return (
        <>
            <div className='p-8'>
                <div className={cn(
                    "flex flex-col justify-center items-center mb-6",
                    step === 'register' && 'justify-start items-start'
                )}>
                    <h2 className="text-2xl font-bold text-[#16372D] mb-3">
                        {step === 'welcome' ? t('auth.title') : step === 'login' ? t('auth.login.title') : t('auth.register.title')}
                    </h2>
                    {step === 'welcome' && <div className='flex flex-row w-full justify-center items-center gap-3'>
                        <p className="text-xs text-gray-500 flex flex-row items-center gap-2">
                            <FaCrown size={16} />
                            {t('auth.advantages.0')}
                        </p>
                        <p className="text-xs text-gray-500 flex flex-row items-center gap-2">
                            <FaCalendarCheck size={16} />
                            {t('auth.advantages.1')}
                        </p>
                    </div>}
                </div>
                <div className="space-y-4">
                    <div>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder={t('auth.login.email')}
                            disabled={step !== 'welcome'}
                            wrapperClassName="mb-2"
                        />

                        <Button
                            type="button"
                            onClick={handleCheckEmail}
                            className="w-full px-6 py-3"
                            disabled={email === '' || isPending}
                        >
                            {isPending ? <Loader /> : t('auth.login.emailFormBtn')}
                        </Button>
                    </div>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                {t('auth.login.or')}
                            </span>
                        </div>
                    </div>


                    {/* Google Login Button */}
                    <GoogleLoginButton />
                </div>
            </div>
        </>
    );
}