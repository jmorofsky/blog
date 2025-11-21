'use client'

import { useState } from "react"
import Authenticate from "../_shared/Authenticate"
import PostCreator from "../_shared/PostCreator"


export default function NewPost() {
    const [hash, setHash] = useState("")

    function updateHash(newHash) {
        setHash(newHash)
    }

    if (!hash) {
        return <Authenticate updateHash={updateHash} />
    } else {
        return <PostCreator hash={hash} />
    }
}
