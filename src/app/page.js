import Database from 'better-sqlite3'
import LatestPost from './_components/LatestPost'
import PostItem from './_components/PostItem'

export default function App() {
    const db = new Database("./src/_db/posts.db", { fileMustExist: true })
    db.pragma('journal_mode = WAL')

    const allPosts = db.prepare("SELECT * FROM posts ORDER BY ID DESC").all()
    const latestPost = allPosts[0]
    const otherPosts = allPosts.slice(1)

    const postElements = []
    postElements.push(<LatestPost key={latestPost.ID} post={latestPost} />)
    otherPosts.forEach(post => {
        postElements.push(<PostItem key={post.ID} post={post} />)
    })

    return (
        <div className='m-auto mt-25 mb-20 grid min-[1700px]:grid-cols-[repeat(2,_650px)] 
        min-[2400px]:grid-cols-[repeat(3,_650px)] justify-center items-center gap-20'>
            {postElements}
        </div>
    )
}
