'use server'

import Database from 'better-sqlite3'
import { promises as fs } from 'fs'
import { loadEnvFile } from 'node:process'
import { getCurrentDate } from '@/app/_shared/common_funcs'


loadEnvFile('./src/app/password.env')

export async function getPostData(id) {
    const db = new Database("./src/_db/posts.db", { fileMustExist: true })
    db.pragma('journal_mode = WAL')

    try {
        const postInfo = db.prepare(`SELECT Title, Description, Date FROM posts WHERE ID = ${id}`).get()

        const path = `./src/_assets/post_md/${id}.md`
        const content = await fs.readFile(path, 'utf8')

        const postData = {
            id: id,
            title: postInfo.Title,
            description: postInfo.Description,
            content: content,
            date: postInfo.Date
        }

        return postData
    } catch (err) {
        return 'error'
    }
}

export async function updatePost(postData) {
    try {
        if (postData.hash != process.env.password_hash) {
            return 'error'
        }

        const id = postData.id
        const title = postData.title
        const description = postData.description
        const image = postData.image
        const content = postData.content
        const date = postData.date
        const edited = getCurrentDate()

        if (!id || !title || !description || !content || !date) {
            return 'error'
        }

        const db = new Database("./src/_db/posts.db", { fileMustExist: true })
        db.pragma('journal_mode = WAL')

        const md_path = `./src/_assets/post_md/${id}.md`
        await fs.writeFile(md_path, content)

        if (image) {
            const arrayBuffer = await image.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)

            const img_path = `./src/_assets/post_images/${id}.png`

            await fs.writeFile(img_path, buffer)
        }

        db.prepare(
            `UPDATE posts SET 
            Title = '${title}', 
            Description = '${description}', 
            Date = '${date}', 
            Edited = '${edited}'
            WHERE ID = '${id}'`
        ).run()

        return 'success'
    } catch {
        return 'error'
    }
}
