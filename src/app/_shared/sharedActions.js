'use server'

import Database from 'better-sqlite3'
import { headers } from 'next/headers'
import bcrypt from 'bcrypt'
import { loadEnvFile } from 'node:process'


loadEnvFile('./src/app/password.env')

export async function validatePassword(previousState, formData) {
    const db = new Database("./src/_db/security.db", { fileMustExist: true })
    db.pragma('journal_mode = WAL')

    try {
        const headerList = await headers()
        const ip = (headerList.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]

        const isBanned = !!db.prepare(`SELECT * FROM bannedIPs WHERE IP = ('${ip}')`).get()
        if (isBanned) {
            return { valid: false, error: false, banned: true, attempts: 0, hash: null }
        }

        const currentDate = Date.now()
        var ipData = db.prepare(`SELECT * FROM attempts WHERE IP = ('${ip}')`).get()
        if (!ipData) {
            db.prepare(`INSERT INTO attempts VALUES('${ip}', 0, '${currentDate}')`).run()
            ipData = { IP: ip, attempts: 0, timestamp: currentDate }
        } else if (ipData.attempts > 5) {
            db.prepare(`INSERT INTO bannedIPs VALUES('${ip}')`).run()
            return { valid: false, error: false, banned: true, attempts: ipData.attempts, hash: null }
        }

        const plaintext_password = formData.get("password")
        const hashed_password = process.env.password_hash

        const isMatch = await bcrypt.compare(plaintext_password, hashed_password)
        if (isMatch) {
            db.prepare(
                `UPDATE attempts SET attempts = 0, 
                timestamp = ${currentDate} WHERE IP = ('${ip}')`
            ).run()
            return { valid: true, error: false, banned: false, attempts: 0, hash: hashed_password }
        } else {
            const newAttemptCount = ipData.attempts + 1
            db.prepare(
                `UPDATE attempts SET attempts = ${newAttemptCount}, 
                timestamp = ${currentDate} WHERE IP = ('${ip}')`
            ).run()
            return { valid: false, error: false, banned: false, attempts: newAttemptCount, hash: null }
        }
    } catch (error) {
        return { valid: false, error: true, banned: false, attempts: previousState.attempts, hash: null }
    }
}
