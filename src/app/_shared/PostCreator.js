'use client'

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState, useEffect } from 'react';
import { getNewPostID, createNewPost } from '../new/newActions';
import { getPostData } from './sharedActions';
import { updatePost } from '../[ID]/edit/editActions';
import { useRouter } from 'next/navigation';
import ErrorPage from './ErrorPage';


export default function PostCreator(props) {
    const isNewPost = !props.id;
    const hash = props.hash;
    const router = useRouter();

    const [id, setId] = useState(props.id);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [saveError, setSaveError] = useState('');

    useEffect(() => {
        if (isNewPost) {
            getNewPostID()
                .then(response => {
                    if (response == 'error') {
                        setError('getNewPostID');
                    } else {
                        setId(response);
                    };
                })
                .catch(err => setError('getNewPostID'));
        } else {
            getPostData(id)
                .then(response => {
                    if (response == 'error') {
                        setError('getPostData');
                    } else {
                        setTitle(response.title);
                        setDescription(response.description);
                        setContent(response.content);
                        setDate(response.date);
                    };
                })
                .catch(err => setError('getPostData'));
        };
    }, []);

    async function savePost() {
        if (!title) {
            setSaveError('Missing Post Title');
            return;
        };

        if (!description) {
            setSaveError('Missing Post Description');
            return;
        };

        if (isNewPost) {
            if (!image) {
                setSaveError('Missing Post Image');
                return;
            };

            if (image.type !== 'image/png') {
                setSaveError('Invalid Image Format');
                return;
            };

            if (image.size / 1000000 > 10) {
                setSaveError('Image Too Large');
                return;
            };
        };

        if (!content) {
            setSaveError('Missing Post Content');
            return;
        };

        setSaveError('');
        setLoading(true);

        let resp;
        if (isNewPost) {
            const postData = {
                id: id,
                title: title,
                description: description,
                image: image,
                content: content,
                hash: hash
            };

            resp = await createNewPost(postData);
        } else {
            const postData = {
                id: id,
                title: title,
                description: description,
                content: content,
                date: date,
                hash: hash
            };

            if (image) {
                postData.image = image;
            };

            resp = await updatePost(postData);
        };

        setLoading(false);

        if (resp == 'error') {
            setSaveError('Error');
        } else if (resp == 'success') {
            router.replace('/');
        } else {
            setError('savePost');
        };
    };

    if (error) {
        return <ErrorPage error={error} />;
    };

    return (
        <div className='px-3 max-[800px]:mt-25'>
            <h1 className='text-primary-text text-2xl font-semibold'>
                {isNewPost ? <>CREATE NEW POST</> : <>EDIT POST</>}
            </h1>
            <hr className='border-gold-accent mt-4 mb-10' />

            <div className='flex gap-10'>
                <div className='flex flex-col gap-15 min-w-[30%] max-w-[800px]'>
                    <div className='flex flex-col'>
                        <label className='text-secondary-text' htmlFor='title'>TITLE</label>
                        <textarea
                            id='title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='p-1 border-2 h-[4em] text-primary-text'
                            style={{ outline: 'none', resize: 'none' }}
                        />
                    </div>

                    <div className='flex flex-col'>
                        <label className='text-secondary-text' htmlFor='description'>DESCRIPTION</label>
                        <textarea
                            id='description'
                            maxLength='500'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='p-1 border-2 h-[8em] text-primary-text'
                            style={{ outline: 'none', resize: 'none' }}
                        />
                    </div>

                    <div className='flex flex-col'>
                        <label className='text-secondary-text' htmlFor='image'>IMAGE</label>
                        <input
                            type='file'
                            id='image'
                            accept='image/png'
                            onChange={(e) => { setImage(e.target.files[0]) }}
                            hidden
                        />

                        <div className='flex gap-3'>
                            <button
                                onClick={() => document.getElementById('image').click()}
                                style={{ outline: 'none', resize: 'none' }}
                                className='
                                    p-1 font-mono text-xs border-2 
                                    text-primary-text cursor-pointer 
                                    h-8 w-23 min-w-23 hover:text-secondary-text 
                                    transition duration-150'
                            >
                                UPLOAD IMAGE
                            </button>

                            {image &&
                                <p className='text-secondary-text w-60 pt-[6px] text-xs'>
                                    {image.name.length > 40 ?
                                        image.name.slice(0, 20) + '...' + image.name.slice(-20)
                                        :
                                        image.name
                                    }
                                </p>
                            }
                        </div>
                    </div>

                    <div className='flex flex-col'>
                        <label className='text-secondary-text' htmlFor='content'>CONTENT</label>
                        <textarea
                            id='content'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className='p-1 border-2 text-primary-text min-h-[8em]'
                            style={{ outline: 'none', resize: 'none', fieldSizing: 'content' }}
                        />
                    </div>
                </div>

                <div className='bg-nav rounded-md p-5 w-full min-w-[55%] max-[800px]:hidden'>
                    <div className='prose max-w-none'>
                        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
                    </div>
                </div>
            </div>

            <div className='mt-8 flex flex-col gap-2 items-start min-[800px]:items-end'>
                <button
                    onClick={savePost}
                    disabled={loading}
                    className='
                        py-2 px-4 bg-border cursor-pointer border-2 
                        font-mono text-xs text-primary-text'
                >
                    SAVE
                </button>

                {saveError && <p className='font-mono text-red-600'>{saveError}</p>}
            </div>
        </div>
    );
};
