import Database from 'better-sqlite3'
import { promises as fs } from 'fs'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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
    const date = selectedPost.Date
    const edited = selectedPost.Edited

    let postContent = ''
    try {
        const path = `./src/_assets/post_md/${ID}.md`
        postContent = await fs.readFile(path, 'utf8')
    } catch (error) {
        return (
            <div className='text-center text-primary-text mt-[30vh] m-auto'>
                <h1 className='text-6xl font-black'>500</h1>
                <p className='mt-3 text-secondary-text text-lg'>There was a problem loading this post.</p>
            </div>
        )
    }

    return (
        <>
            <div className="flex flex-col mt-24 mb-15 px-15 gap-3">
                <p className='text-secondary-text font-mono text-sm'>
                    🗓 {date}{edited && <em className='text-accent'>&nbsp;&nbsp;[Edited: {edited}]</em>}
                </p>
                <hr className='text-gold-accent' />

                <h1 className='text-primary-text text-5xl mb-5'>{title}</h1>

                <div className='prose'>
                    <Markdown remarkPlugins={[remarkGfm]}>{postContent}</Markdown>
                </div>
            </div>
        </>
    )
}
