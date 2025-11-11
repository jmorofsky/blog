'use client'

import { useActionState } from "react"
import { validatePassword } from "./actions"
import NewPost from "./_components/NewPost"

export default function Validate() {
    const [passwordResponse, passwordAction, passwordPending] =
        useActionState(validatePassword, { valid: false, error: false, banned: false, attempts: 0, hash: null })

    if (!passwordResponse.valid) {
        return (
            <div className='m-auto mt-[30vh] w-50 text-primary-text'>
                <form action={passwordAction} autoComplete="off">
                    <p className="font-mono">Enter password:</p>
                    <input
                        type="password"
                        disabled={passwordPending}
                        name="password"
                        maxLength="20"
                        className="p-1 border-2"
                        style={{ outline: "none" }}
                    />

                    {
                        passwordResponse.attempts > 0 &&
                        passwordResponse.attempts <= 6 &&
                        !passwordResponse.banned &&
                        !passwordResponse.error &&
                        <p className="font-mono">Attempt: {passwordResponse.attempts}</p>
                    }
                    {passwordResponse.error && <p className="font-mono text-red-600">Error</p>}
                    {passwordResponse.banned && <p className="font-mono text-red-600">Banned</p>}
                </form>
            </div>
        )
    }

    return (
        <NewPost hash={passwordResponse.hash} />
    )
}
