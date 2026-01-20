import { ArticleStatuses } from "@/types/adventures";
import { FiCheck, FiX, FiSend, FiEdit3 } from 'react-icons/fi';

interface StatusActionButtonsProps {
    currentStatus: ArticleStatuses | string;
    userRole: string;
    onChange: (status: ArticleStatuses) => void;
}

export const StatusActionButtons = ({ currentStatus, userRole, onChange }: StatusActionButtonsProps) => {
    const getButtonConfig = () => {
        switch (userRole) {
            case 'ADMIN':
            case 'MODERATOR':
                return [
                    {
                        status: ArticleStatuses.PUBLISHED,
                        label: 'Publish',
                        icon: FiCheck,
                        color: 'bg-green-600 hover:bg-green-700 text-white',
                        activeColor: 'bg-green-700 ring-2 ring-green-500',
                    },
                    {
                        status: ArticleStatuses.CANCELLED,
                        label: 'Cancel',
                        icon: FiX,
                        color: 'bg-red-600 hover:bg-red-700 text-white',
                        activeColor: 'bg-red-700 ring-2 ring-red-500',
                    },
                ];
            case 'EDITOR':
                return [
                    {
                        status: ArticleStatuses.DRAFT,
                        label: 'Save as Draft',
                        icon: FiEdit3,
                        color: 'bg-slate-600 hover:bg-slate-700 text-white',
                        activeColor: 'bg-slate-700 ring-2 ring-slate-500',
                    },
                    {
                        status: ArticleStatuses.TO_REVIEW,
                        label: 'Send to Review',
                        icon: FiSend,
                        color: 'bg-blue-600 hover:bg-blue-700 text-white',
                        activeColor: 'bg-blue-700 ring-2 ring-blue-500',
                    },
                ];
            case 'SEO':
                return [
                    {
                        status: ArticleStatuses.TO_REVIEW,
                        label: 'Send to Review',
                        icon: FiSend,
                        color: 'bg-blue-600 hover:bg-blue-700 text-white',
                        activeColor: 'bg-blue-700 ring-2 ring-blue-500',
                    },
                ];
            default:
                return [];
        }
    };

    const buttons = getButtonConfig();

    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Status Actions
            </label>
            <div className="flex flex-col gap-2">
                {buttons.map(({ status, label, icon: Icon, color, activeColor }) => {
                    const isActive = currentStatus === status;
                    return (
                        <button
                            key={status}
                            type="button"
                            onClick={() => onChange(status)}
                            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${isActive ? activeColor : color
                                } ${isActive ? 'cursor-default' : 'cursor-pointer'}`}
                            disabled={isActive}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{label}</span>
                            {isActive && (
                                <span className="ml-auto text-xs opacity-75">(Current)</span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Current status indicator */}
            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                    Current status: <span className="font-semibold text-slate-700 dark:text-slate-300">{currentStatus}</span>
                </p>
            </div>
        </div>
    );
};
