import Database from 'better-sqlite3';
import LatestPost from './_components/LatestPost';
import PostItem from './_components/PostItem';
import ErrorPage from './_shared/ErrorPage';


export default function App() {
    const db = new Database('./src/_db/posts.db', { fileMustExist: true });
    db.pragma('journal_mode = WAL');

    let allPosts;
    try {
        allPosts = db.prepare('SELECT * FROM posts ORDER BY ID DESC').all();
    } catch {
        return <ErrorPage error='App' />;
    };
    
    const latestPost = allPosts[0];
    const otherPosts = allPosts.slice(1);

    const postElements = [];
    for (const post of otherPosts) {
        postElements.push(<PostItem key={post.ID} post={post} />)
    };

    return (
        <div className='max-w-200'>
            <LatestPost post={latestPost} />

            <div className='mt-12 px-3'>
                <h1 className='text-primary-text text-xl font-semibold'>
                    OTHER POSTS
                </h1>
                <p className='text-secondary-text text-sm pt-1'>
                    BROWSE ALL MY CONTENT
                </p>

                <hr className='border-gold-accent mt-4 mb-4' />

                <div className='flex flex-col gap-12'>
                    {postElements}
                </div>
            </div>
        </div>
    );
};
