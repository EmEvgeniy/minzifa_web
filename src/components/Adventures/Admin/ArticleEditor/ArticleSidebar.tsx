import { Control, UseFormRegister, FieldErrors, Controller } from "react-hook-form";
import { useCategories } from "@/api/adventures/categories";
import { useAdventuresUsers } from "@/api/adventures/users";
import { ArticleFormData } from "./types";
import { LangSelector } from "../UI/LangSelector";
import { ImageSelector } from "../UI/ImageSelector";
import { CustomSelect } from "../UI/CustomSelect";
import { TagsInput } from "../UI/TagsInput";
import { DatePicker } from "../UI/DatePicker";
import { ArticleStatuses } from "@/types/adventures";

interface ArticleSidebarProps {
    register: UseFormRegister<ArticleFormData>;
    control: Control<ArticleFormData>;
    errors: FieldErrors<ArticleFormData>;
    userRole: string;
}

export const ArticleSidebar = ({ register, control, errors, userRole }: ArticleSidebarProps) => {
    const { data: categories, isLoading: isCategoriesLoading } = useCategories();
    const { data: authors = [], isLoading: isUsersLoading } = useAdventuresUsers();

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Settings</h2>
                <div className="space-y-4">
                    <Controller
                        name="lang"
                        control={control}
                        render={({ field }) => (
                            <LangSelector
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </div>
            </div>

            {/* Publishing Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Publishing</h2>

                <div className="space-y-4">
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => {
                            const statusLabels: Record<ArticleStatuses, string> = {
                                [ArticleStatuses.DRAFT]: 'Draft',
                                [ArticleStatuses.PUBLISHED]: 'Published',
                                [ArticleStatuses.CANCELLED]: 'Cancelled',
                                [ArticleStatuses.ARCHIVED]: 'Archived',
                                [ArticleStatuses.TO_REVIEW]: 'To Review',
                            };

                            const statusColors: Record<ArticleStatuses, string> = {
                                [ArticleStatuses.DRAFT]: 'bg-slate-100 text-slate-700 border-slate-200',
                                [ArticleStatuses.PUBLISHED]: 'bg-green-100 text-green-700 border-green-200',
                                [ArticleStatuses.CANCELLED]: 'bg-red-100 text-red-700 border-red-200',
                                [ArticleStatuses.ARCHIVED]: 'bg-amber-100 text-amber-700 border-amber-200',
                                [ArticleStatuses.TO_REVIEW]: 'bg-blue-100 text-blue-700 border-blue-200',
                            };

                            const currentStatus = (field.value || ArticleStatuses.DRAFT) as ArticleStatuses;

                            return (
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Current Status
                                    </label>
                                    <div className={`px-4 py-3 rounded-lg border font-medium text-sm ${statusColors[currentStatus]}`}>
                                        {statusLabels[currentStatus]}
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                                        Use the action buttons in the header to change status and save.
                                    </p>
                                </div>
                            );
                        }}
                    />

                    <Controller
                        name="publishedAt"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                value={field.value || ''}
                                onChange={field.onChange}
                                label="Published Date"
                            />
                        )}
                    />
                </div>
            </div>

            {/* Media Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Media</h2>
                <div className="space-y-4">
                    <Controller
                        name="image"
                        control={control}
                        render={({ field }) => (
                            <ImageSelector
                                value={field.value}
                                onChange={field.onChange}
                                label="Cover Image"
                                description="High quality image for the article preview"
                            />
                        )}
                    />
                </div>
            </div>

            {/* Metadata Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Metadata</h2>

                <div className="space-y-4">
                    <Controller
                        name="categories"
                        control={control}
                        render={({ field }) => (
                            <CustomSelect
                                label="Categories"
                                value={field.value ? field.value : []}
                                onChange={(val) => field.onChange(val as number[])}
                                multiple
                                options={categories?.map(c => ({ value: c.id, label: c.name })) || []}
                                placeholder="Select Categories"
                                isLoading={isCategoriesLoading}
                                error={errors.categories?.message}
                            />
                        )}
                    />

                    {(userRole === 'ADMIN' || userRole === 'MODERATOR') && (
                        <Controller
                            name="userId"
                            control={control}
                            render={({ field }) => (
                                <CustomSelect
                                    label="Author"
                                    value={field.value || ""}
                                    onChange={(val) => field.onChange(val as number)}
                                    options={authors?.map(a => ({ value: a.id, label: a.name })) || []}
                                    placeholder="Select Author"
                                    isLoading={isUsersLoading}
                                    error={errors.userId?.message}
                                />
                            )}
                        />
                    )}
                    {userRole === 'SEO' && (
                        <div className="opacity-70 pointer-events-none">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Author (Read-only)</label>
                            <div className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 font-medium">
                                {authors?.find(a => a.id === control._defaultValues.userId)?.name || 'Author'}
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Read time</label>
                        <input
                            {...register("readTime")}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#3ca542] disabled:opacity-70"
                        />
                        {errors.readTime && <p className="text-red-500 text-sm mt-1">{errors.readTime.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Slug</label>
                        <input
                            {...register("slug")}
                            disabled={userRole === 'EDITOR' || userRole === 'SEO'}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#3ca542] disabled:opacity-70"
                        />
                        {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
                    </div>

                    <Controller
                        name="tags"
                        control={control}
                        render={({ field }) => (
                            <TagsInput
                                value={field.value || []}
                                onChange={field.onChange}
                                label="Tags"
                                placeholder="Type a tag and press Enter"
                                error={errors.tags?.message}
                            />
                        )}
                    />
                </div>
            </div>

            {/* SEO Card - Hidden for EDITOR */}
            {userRole !== 'EDITOR' && (
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">SEO</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                SEO Title
                            </label>
                            <input
                                {...register("seo.title")}
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3ca542]"
                                placeholder="Leave empty to use article title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                SEO Description
                            </label>
                            <textarea
                                {...register("seo.description")}
                                rows={3}
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3ca542]"
                                placeholder="Leave empty to use excerpt"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                SEO Keywords
                            </label>
                            <input
                                {...register("seo.keywords")}
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3ca542]"
                                placeholder="keyword1, keyword2, keyword3"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
