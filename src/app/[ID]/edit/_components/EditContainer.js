'use client'

import { useState, useEffect } from "react"
import { getPostData } from '../editActions'
import ErrorPage from "@/app/_shared/ErrorPage"
import Authenticate from "@/app/_shared/Authenticate"
import PostCreator from "@/app/_shared/PostCreator"


export default function EditContainer(props) {
    const ID = props.ID

    const [hash, setHash] = useState("")
    const [error, setError] = useState(false)
    const [postData, setPostData] = useState({})

    useEffect(() => {
        getPostData(ID)
            .then(response => {
                if (response == 'error') {
                    setError(true)
                } else {
                    setPostData(response)
                }
            })
            .catch(error => setError(true))
    }, [])

    function updateHash(newHash) {
        setHash(newHash)
    }

    if (error) {
        return <ErrorPage />
    }

    if (!hash) {
        return <Authenticate updateHash={updateHash} />
    }

    return <PostCreator hash={hash} postData={postData} />
}
