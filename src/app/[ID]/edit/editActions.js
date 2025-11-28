'use server'

import Database from 'better-sqlite3';
import { promises as fs } from 'fs';
import { loadEnvFile } from 'node:process';
import { getCurrentDate } from '@/app/_shared/common_funcs';


loadEnvFile('./src/app/password.env');

export async function updatePost(postData) {
    try {
        if (postData.hash != process.env.password_hash) {
            return 'error';
        };

        const id = postData.id;
        const title = postData.title;
        const description = postData.description;
        const image = postData.image;
        const content = postData.content;
        const date = postData.date;
        const edited = getCurrentDate();

        if (!id || !title || !description || !content || !date) {
            return 'error';
        };

        const db = new Database("./src/_db/posts.db", { fileMustExist: true });
        db.pragma('journal_mode = WAL');

        if (image) {
            const arrayBuffer = await image.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const img_path = `./src/_assets/post_images/${id}.png`;

            await fs.writeFile(img_path, buffer);
        };

        const query = `UPDATE posts SET 
                Title = ?, 
                Description = ?, 
                Content = ?, 
                Date = ?, 
                Edited = ? 
            WHERE ID = ?`;

        db.prepare(query).run(title, description, content, date, edited, id);

        return 'success';
    } catch {
        return 'error';
    };
};
