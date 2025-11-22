import EditPost from './_components/EditPost';
import NotFoundPage from '@/app/_shared/NotFoundPage';


export default async function EditPostContainer({ params }) {
    const { ID } = await params;
    if (isNaN(ID)) {
        return <NotFoundPage />;
    };

    return <EditPost ID={ID} />;
};
