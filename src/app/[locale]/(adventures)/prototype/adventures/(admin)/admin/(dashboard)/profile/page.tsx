import ProfilePage from '@/components/Adventures/Admin/Profile/ProfilePage';

export default function Page({ params }: { params: { locale: string } }) {
    return <ProfilePage locale={params.locale} />;
}
