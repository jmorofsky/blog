'use client'

import { useActionState } from "react"
import { validatePassword } from "./actions"

export default function NewPost() {
    const [passwordResponse, passwordAction, passwordPending] =
        useActionState(validatePassword, { valid: false, error: false, banned: false, attempts: 0 })

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
                    
                    {passwordResponse.error && <p className="font-mono text-red-600">Error</p>}
                    {passwordResponse.banned && <p className="font-mono text-red-600">Banned</p>}
                </form>
            </div>
        )
    }

    return (
        <p className="text-primary-text mt-25">valid</p>
    )
}
