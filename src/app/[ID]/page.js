import Database from 'better-sqlite3'

export default async function Post({ params }) {
    const { ID } = await params

    const db = new Database("./src/_db/posts.db", { fileMustExist: true })
    db.pragma('journal_mode = WAL')

    const selectedPost = db.prepare(`SELECT Title, Date, Edited FROM posts WHERE ID = ${ID}`).get()
    if (selectedPost == undefined) {
        return (
            <div className='text-center text-primary-text mt-[30vh] m-auto'>
                <h1 className='text-6xl font-black'>404</h1>
                <p className='mt-3 text-secondary-text text-lg'>That post doesn't exist.</p>
            </div>
        )
    }

    const title = selectedPost.Title
    const date = selectedPost.date
    const edited = selectedPost.Edited

    return (
        <div className="text-primary-text ml-[500px] mt-20">{title}</div>
    )
}
