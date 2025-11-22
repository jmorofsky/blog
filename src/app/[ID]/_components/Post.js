'use client'

import { useState, useEffect } from 'react';
import { getPostData } from '@/app/_shared/sharedActions';
import Image from 'next/image';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ErrorPage from '@/app/_shared/ErrorPage';
import NotFoundPage from '@/app/_shared/NotFoundPage';


export default function Post(props) {
    const id = props.id;
    const image = require(`@/_assets/post_images/${id}.png`);

    const [error, setError] = useState('');
    const [notFound, setNotFound] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');
    const [edited, setEdited] = useState('');

    if (error) {
        return <ErrorPage error={error} />;
    };

    if (notFound) {
        return <NotFoundPage />;
    };

    useEffect(() => {
        getPostData(id)
            .then(response => {
                if (response == 'error') {
                    setError('getPostData');
                } else if (response == 'notFound') {
                    setNotFound(true);
                } else {
                    setTitle(response.title);
                    setContent(response.content);
                    setDate(response.date);
                    setEdited(response.edited);
                };
            })
            .catch(err => {
                setError('getPostData');
            });
    }, []);

    return (
        <div className='max-w-200'>
            <p className='text-secondary-text font-mono text-sm'>
                🗓 {date}
                {edited &&
                    <em className='text-accent ml-4'>[Edited: {edited}]</em>
                }
            </p>
            <hr className='mt-4 mb-1 text-gold-accent' />
            <h1 className='text-primary-text text-3xl mb-5 min-[600px]:text-5xl'>{title}</h1>

            <Image
                src={image}
                alt=''
                className='mb-8 rounded-sm object-cover ring-4 ring-[#202020]'
            />

            <div className='prose max-w-none'>
                <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
            </div>
        </div>
    );
};
