'use client'

import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useState, useEffect } from "react"
import { getNewPostID, createNewPost } from "../actions"
import { useRouter } from 'next/navigation'

export default function NewPost(props) {
    const hash = props.hash
    const router = useRouter()

    const [newPostID, setNewPostID] = useState(null)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const [content, setContent] = useState("")
    const [saveLoading, setSaveLoading] = useState(false)
    const [error, setError] = useState(false)
    const [missingField, setMissingField] = useState(false) // false, "title", "desc", "image", "content"
    const [saveError, setSaveError] = useState(false)

    useEffect(() => {
        getNewPostID()
            .then((result) => {
                setNewPostID(result)
            })
            .catch((error) => {
                setError(true)
            })
    }, [])

    async function handleSaveClick() {
        setSaveLoading(true)

        if (title == "") {
            setMissingField("title")
            setSaveLoading(false)
            return
        } else if (description == "") {
            setMissingField("desc")
            setSaveLoading(false)
            return
        } else if (image == null) {
            setMissingField("image")
            setSaveLoading(false)
            return
        } else if (content == "") {
            setMissingField("content")
            setSaveLoading(false)
            return
        } else {
            setMissingField(false)
        }

        const postData = {
            id: newPostID,
            title: title,
            description: description,
            image: image,
            content: content,
            hash: hash
        }

        const resp = await createNewPost(postData)

        setSaveLoading(false)

        if (resp == "error") {
            setSaveError(true)
        }
        if (resp == "success") {
            router.replace('/')
        }
    }

    if (error) {
        return (
            <div className='text-center text-primary-text mt-[30vh] m-auto'>
                <h1 className='text-6xl font-black'>500</h1>
                <p className='mt-3 text-secondary-text text-lg'>There was a problem loading this page.</p>
            </div>
        )
    }

    return (
        <div className="mt-25 mb-15 px-15">
            <h1 className="text-primary-text text-2xl font-semibold whitespace-nowrap">
                CREATE NEW POST
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
                            accept="image/*"
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
                    disabled={saveLoading}
                    className='mt-8 p-2 px-4 w-15 bg-border cursor-pointer border-2 font-mono 
                    text-xs text-primary-text'
                >
                    SAVE
                </button>

                {saveError && <p className="font-mono text-red-600">An Error Occurred</p>}
                {missingField == "title" && <p className="font-mono text-red-600">Missing Post Title</p>}
                {missingField == "desc" && <p className="font-mono text-red-600">Missing Post Description</p>}
                {missingField == "image" && <p className="font-mono text-red-600">Missing Post Image</p>}
                {missingField == "content" && <p className="font-mono text-red-600">Missing Post Content</p>}
                </div>
            </div>
        </div>
    )
}
