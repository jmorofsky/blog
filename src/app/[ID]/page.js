import NotFoundPage from '../_shared/NotFoundPage';
import Post from './_components/Post';


export default async function PostContainer({ params }) {
    const { ID } = await params;
    if (isNaN(ID)) {
        return <NotFoundPage />;
    };

    return <Post id={ID} />;
};
