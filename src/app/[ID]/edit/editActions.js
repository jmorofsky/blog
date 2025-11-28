'use server'

import Database from 'better-sqlite3';
import { loadEnvFile } from 'node:process';
import { getCurrentDate } from '@/app/_shared/common_funcs';
import { revalidatePath } from 'next/cache';


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
            const query = `UPDATE posts SET 
                Title = ?, 
                Description = ?, 
                Content = ?, 
                Image = ?,
                Date = ?, 
                Edited = ? 
            WHERE ID = ?`;
            db.prepare(query).run(title, description, content, image, date, edited, id);
        } else {
            const query = `UPDATE posts SET 
                Title = ?, 
                Description = ?, 
                Content = ?, 
                Date = ?, 
                Edited = ? 
            WHERE ID = ?`;
            db.prepare(query).run(title, description, content, date, edited, id);
        };

        revalidatePath('/');

        return 'success';
    } catch (err) {
        console.error('Error updating post: ', err);
        return 'error';
    };
};
