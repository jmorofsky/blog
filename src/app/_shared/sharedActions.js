'use server'

import Database from 'better-sqlite3';
import { headers } from 'next/headers';
import bcrypt from 'bcrypt';
import { loadEnvFile } from 'node:process';


loadEnvFile('./src/app/password.env');

export async function getPostData(id) {
    try {
        const db = new Database('./src/_db/posts.db', { fileMustExist: true });
        db.pragma('journal_mode = WAL');

        const postData = db.prepare(
            `SELECT Title, Description, Content, Image, Date, Edited FROM posts WHERE ID = ${id}`
        ).get();

        if (postData == undefined) {
            return 'notFound';
        };

        const postObj = {
            id: id,
            title: postData.Title,
            description: postData.Description,
            content: postData.Content,
            image: postData.Image,
            date: postData.Date,
            edited: postData.Edited
        };

        return postObj;
    } catch (err) {
        console.error('Error getting post data: ', err);
        return 'error';
    };
};

export async function validatePassword(password) {
    try {
        const db = new Database('./src/_db/security.db', { fileMustExist: true });
        db.pragma('journal_mode = WAL');

        const headerList = await headers();
        const ip = (headerList.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];

        const isBanned = !!db.prepare(`SELECT * FROM bannedIPs WHERE IP = ('${ip}')`).get();
        if (isBanned) {
            return 'banned';
        };

        const ipData = db.prepare(`SELECT * FROM attempts WHERE IP = ('${ip}')`).get();
        let attempts = 0;
        if (ipData == undefined) {
            db.prepare(
                `INSERT INTO attempts VALUES(
                    '${ip}', 
                    0
                )`
            ).run();
        } else {
            attempts = ipData.attempts;
        };

        const hashed_password = process.env.password_hash;
        const passwordIsValid = await bcrypt.compare(password, hashed_password);
        if (passwordIsValid) {
            db.prepare(
                `UPDATE attempts SET 
                    attempts = 0
                WHERE IP = ('${ip}')`
            ).run();

            return hashed_password;
        } else {
            if (attempts > 4) {
                db.prepare(`
                    INSERT INTO bannedIPs VALUES(
                        '${ip}'
                    )`
                ).run();

                return 'banned';
            } else {
                attempts = attempts + 1;
                db.prepare(
                    `UPDATE attempts SET 
                    attempts = ${attempts}
                WHERE IP = ('${ip}')`
                ).run();

                return attempts;
            };
        };
    } catch (err) {
        console.error('Error while validating password: ', err);
        return 'error';
    };
};
