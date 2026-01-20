import BlockTitle from '@/components/Adventures/UI/shared/BlockTitle';
import Breadcrumbs from '@/components/Adventures/UI/Breadcrumbs';
import { Category } from '@/types/adventures';

interface CategoryHeaderProps {
    category: Category;
    breadcrumbItems: Array<{ label: string; href?: string }>;
}

export default function CategoryHeader({ category, breadcrumbItems }: CategoryHeaderProps) {
    return (
        <>
            <div className="mb-8">
                <Breadcrumbs items={breadcrumbItems} />
            </div>
            <BlockTitle
                title={category.name}
                className="text-2xl md:text-3xl lg:text-[56px] font-title font-medium normal-case"
            />
        </>
    );
}
