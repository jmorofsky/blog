import Database from 'better-sqlite3'

export default function App() {
    const db = new Database("./src/_db/posts.db", {fileMustExist: true})
    db.pragma('journal_mode = WAL')

    const posts = db.prepare("SELECT * FROM posts").get()
    // console.log(posts)

    return (
        <div className='text-primary-text'>{posts.Title}</div>
    )
}
