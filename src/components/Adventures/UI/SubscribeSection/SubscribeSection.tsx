'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SubscribeSectionProps {
    title?: string;
    className?: string;
}

export default function SubscribeSection({
    title = 'Subscribe for travel deals and inspiration',
    className = '',
}: SubscribeSectionProps) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        country: '',
        email: '',
        agreed: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.agreed) return;

        setIsSubmitting(true);
        // Эмуляция запроса
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({
            firstName: '',
            lastName: '',
            country: '',
            email: '',
            agreed: false
        });
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    const inputClasses = "w-full px-4 py-3.5 bg-white border border-gray-300 rounded-[18px] text-sm text-text-secondary outline-none focus:border-[#28A745] transition-colors placeholder:text-gray-400";

    return (
        <div className={`bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-4 ${className}`}>
            <h3 className="font-title font-bold text-2xl text-text mb-8 leading-tight max-w-[280px]">
                {title}
            </h3>

            {isSubmitted ? (
                <div className="bg-green-50 text-[#2F4F3E] text-sm font-medium p-4 rounded-xl border border-green-100 animate-in fade-in duration-500">
                    Thank you! You've been subscribed to our newsletter. 🎉
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First name*"
                            className={inputClasses}
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last name*"
                            className={inputClasses}
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="Country of residence*"
                            className={inputClasses}
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email*"
                            className={inputClasses}
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="flex items-start gap-3 py-2">
                        <div className="relative pt-0.5">
                            <input
                                type="checkbox"
                                name="agreed"
                                id="agreed"
                                checked={formData.agreed}
                                onChange={handleChange}
                                className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 transition-all checked:bg-[#28A745] checked:border-[#28A745] outline-none"
                                required
                            />
                            <svg
                                className="absolute top-1 left-0.5 h-4 w-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="3"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <label htmlFor="agreed" className="text-[13px] text-gray-600 leading-[1.4] cursor-pointer">
                            By submitting a request, you agree to the{' '}
                            <Link href="#" className="text-[#28A745] hover:underline transition-all">Privacy Policy</Link>
                        </label>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting || !formData.agreed}
                            className="w-full px-6 py-4 bg-[#28A745] hover:bg-[#218838] text-white rounded-full font-bold text-sm lg:text-base transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(40,167,69,0.3)] hover:shadow-[0_6px_20px_rgba(40,167,69,0.23)] active:scale-[0.98]"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Subscribing...</span>
                                </>
                            ) : (
                                'Subscribe to emails'
                            )}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
