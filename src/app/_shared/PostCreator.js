'use client'

import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useState, useEffect } from "react"
import { getNewPostID, createNewPost } from "../new/newActions"
import { updatePost } from '../[ID]/edit/editActions'
import { useRouter } from 'next/navigation'
import ErrorPage from './ErrorPage'


export default function PostCreator(props) {
    const isNewPost = !props.postData
    const hash = props.hash
    const router = useRouter()

    const [id, setId] = useState(null)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const [content, setContent] = useState("")
    const [date, setDate] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [saveError, setSaveError] = useState("")

    useEffect(() => {
        if (isNewPost) {
            getNewPostID()
                .then((response) => {
                    if (response == 'error') {
                        setError("getNewPostID")
                    } else {
                        setId(response)
                    }
                })
                .catch((error) => {
                    setError("getNewPostID")
                })
        } else {
            try {
                const post = props.postData

                setId(post.id)
                setTitle(post.title)
                setDescription(post.description)
                setContent(post.content)
                setDate(post.date)
            } catch {
                setError("useEffect")
            }
        }
    }, [])

    async function handleSaveClick() {
        if (title == "") {
            setSaveError("Missing Post Title")
            return
        }

        if (description == "") {
            setSaveError("Missing Post Description")
            return
        }

        if (isNewPost) {
            if (image == null) {
                setSaveError("Missing Post Image")
                return
            }

            if (image.type !== "image/png") {
                setSaveError("Invalid Image Format")
                return
            }
        }

        if (content == "") {
            setSaveError("Missing Post Content")
            return
        }

        setSaveError("")
        setLoading(true)

        let resp;
        if (isNewPost) {
            const postData = {
                id: id,
                title: title,
                description: description,
                image: image,
                content: content,
                hash: hash
            }

            resp = await createNewPost(postData)
        } else {
            const postData = {
                id: id,
                title: title,
                description: description,
                content: content,
                date: date,
                hash: hash
            }

            if (image) {
                postData.image = image
            }

            resp = await updatePost(postData)
        }

        setLoading(false)

        if (resp == "error") {
            setSaveError("An Error Occurred")
        }
        if (resp == "success") {
            router.replace('/')
        }
    }

    if (error) {
        return <ErrorPage error={error} />
    }

    return (
        <div className="mt-25 mb-15 px-15">
            <h1 className="text-primary-text text-2xl font-semibold whitespace-nowrap">
                {isNewPost ? <>CREATE NEW POST</> : <>EDIT POST</>}
            </h1>
            <hr className='border-gold-accent mt-4 mb-10' />

            <div className="flex justify-between gap-10">
                <div className="flex flex-col min-w-[40%] w-[40%] gap-15 max-[700px]:w-[100%]">
                    <div className="flex flex-col">
                        <label className="text-secondary-text" htmlFor="title">TITLE</label>
                        <textarea
                            id="title"
                            name="title"
                            maxLength="100"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="p-1 border-2 h-[4em] text-primary-text"
                            style={{ outline: "none", resize: "none" }}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-secondary-text" htmlFor="description">DESCRIPTION</label>
                        <textarea
                            id="description"
                            name="description"
                            maxLength="500"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="p-1 border-2 h-[8em] text-primary-text"
                            style={{ outline: "none", resize: "none" }}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-secondary-text" htmlFor="image">IMAGE</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/png"
                            onChange={(e) => setImage(e.target.files[0])}
                            hidden
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={() => document.getElementById("image").click()}
                                className="p-1 border-2 text-primary-text cursor-pointer text-left 
                                    h-10 min-w-23 hover:text-secondary-text transition duration-150 
                                    font-mono text-xs"
                                style={{ outline: "none", resize: "none" }}
                            >
                                UPLOAD IMAGE
                            </button>
                            {image &&
                                <p className="text-secondary-text w-80 h-10 whitespace-nowrap 
                                    pt-2 overflow-hidden max-[1380px]:text-xs max-[1380px]:pt-3 
                                    max-[1380px]:whitespace-normal max-[1380px]:overflow-visible">
                                    {image.name.length > 40 ?
                                        image.name.slice(0, 20) + "..." + image.name.slice(-20)
                                        :
                                        image.name}
                                </p>
                            }
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-secondary-text" htmlFor="content">CONTENT</label>
                        <textarea
                            id="content"
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="p-1 border-2 text-primary-text min-h-[8em]"
                            style={{ outline: "none", resize: "none", fieldSizing: "content" }}
                        />
                    </div>
                </div>

                <div className='bg-nav 
                    rounded-md p-5 min-w-[56%] max-w-[1100px] overflow-x-hidden max-[700px]:hidden'>
                    <div className='prose max-w-none'>
                        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
                    </div>
                </div>
            </div>

            <div className='flex justify-end'>
                <div className='flex flex-col items-end gap-2'>
                    <button
                        onClick={handleSaveClick}
                        disabled={loading}
                        className='mt-8 p-2 px-4 w-15 bg-border cursor-pointer border-2 font-mono 
                    text-xs text-primary-text'
                    >
                        SAVE
                    </button>

                    {saveError && <p className="font-mono text-red-600">{saveError}</p>}
                </div>
            </div>
        </div>
    )
}
