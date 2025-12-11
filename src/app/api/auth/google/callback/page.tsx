"use client";

import { useEffect, useState } from "react";
import { authAxiosInstance } from "@/utils/axios";

export default function GoogleCallbackPage() {
    const [status, setStatus] = useState<"loading" | "success" | "error">(
        "loading"
    );

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const code = urlParams.get("code");
                const errorParam = urlParams.get("error");

                if (errorParam) {
                    throw new Error(`Google OAuth error: ${errorParam}`);
                }

                if (!code) {
                    throw new Error("Код авторизации не найден");
                }

                const response = await authAxiosInstance.get(
                    `/auth/google/callback?code=${code}`
                );

                if (!response.data.success) {
                    throw new Error(response.data.message || "Ошибка авторизации");
                }

                setStatus("success");

                if (window.opener) {
                    window.opener.postMessage(
                        {
                            type: "google-auth-success",
                            user: response.data.user,
                        },
                        window.location.origin
                    );
                }

                setTimeout(() => {
                    window.close();
                }, 1000);
            } catch (err) {
                console.error("Google callback error:", err);
                const errorMessage =
                    err instanceof Error ? err.message : "Ошибка авторизации";
                setStatus("error");

                if (window.opener) {
                    window.opener.postMessage(
                        {
                            type: "google-auth-error",
                            error: errorMessage,
                        },
                        window.location.origin
                    );
                }

                setTimeout(() => {
                    window.close();
                }, 3000);
            }
        };

        handleCallback();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                {status === "loading" && (
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                )}

                {status === "success" && (
                    <svg
                        className="w-12 h-12 text-green-600 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                )}

                {status === "error" && (
                    <svg
                        className="w-12 h-12 text-red-600 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                )}
            </div>
        </div>
    );
}
