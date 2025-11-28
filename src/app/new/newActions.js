'use server'

import Database from 'better-sqlite3';
import { promises as fs } from 'fs';
import { loadEnvFile } from 'node:process';
import { getCurrentDate } from '../_shared/common_funcs';


loadEnvFile('./src/app/password.env');

const db = new Database("./src/_db/posts.db", { fileMustExist: true });
db.pragma('journal_mode = WAL');

export async function getNewPostID() {
    try {
        const latest_id = db.prepare('SELECT ID FROM posts ORDER BY ID DESC').get();

        if (latest_id == undefined) {
            return 0;
        } else {
            return latest_id.ID + 1;
        };
    } catch {
        return 'error';
    };
};

export async function createNewPost(postData) {
    try {
        if (postData.hash != process.env.password_hash) {
            return 'error';
        };

        const id = postData.id;
        const title = postData.title;
        const description = postData.description;
        const image = postData.image;
        const content = postData.content;
        const date = getCurrentDate();

        if ((!id && id != 0) || !title || !description || !image || !content) {
            return 'error';
        };

        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const img_path = `./src/_assets/post_images/${id}.png`;
        await fs.writeFile(img_path, buffer);

        const query = `INSERT INTO posts VALUES(?, ?, ?, ?, ?, null)`;

        db.prepare(query).run(id, title, description, content, date);

        return 'success';
    } catch {
        return 'error';
    };
};
