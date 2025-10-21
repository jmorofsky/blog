import Database from 'better-sqlite3'

export default async function Post({ params }) {
    const { ID } = await params

    const db = new Database("./src/_db/posts.db", { fileMustExist: true })
    db.pragma('journal_mode = WAL')
    
    const selectedPost = db.prepare(`SELECT * FROM posts WHERE ID = ${ID}`).get()
    const title = selectedPost.Title
    const date = selectedPost.date
    const edited = selectedPost.Edited

    return (
        <div className="text-primary-text ml-[500px] mt-20">{title}</div>
    )
}
