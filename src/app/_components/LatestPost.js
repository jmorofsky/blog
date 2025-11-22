'use client'

import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '../_shared/common_funcs';


export default function LatestPost(props) {
    const id = props.post.ID;
    const title = props.post.Title;
    const description = props.post.Description;
    const image = require(`@/_assets/post_images/${id}.png`);
    const date = props.post.Date;
    const edited = props.post.Edited;

    return (
        <div className='
            p-3 rounded-lg hover:bg-[#282828] hover:ring-4 
            hover:ring-[#202020] transition duration-150'
        >
            <h1 className='text-primary-text text-xl font-semibold'>
                LATEST POST
            </h1>
            <p className='text-secondary-text text-sm pt-1'>
                WHAT I'VE BEEN DOING RECENTLY
            </p>

            <hr className='border-gold-accent mt-4 mb-4' />

            <p className='font-mono text-secondary-text text-xs mb-4'>
                🗓 {formatDate(date)} {edited &&
                    <em
                        className='text-accent'>
                        &emsp;[Edited: {formatDate(edited)}]
                    </em>
                }
            </p>

            <Link href={`/${id}`}>
                <Image
                    src={image}
                    alt=''
                    className='mb-4 rounded-sm object-cover ring-4 ring-[#202020]'
                />

                <p className='text-primary-text text-3xl font-semibold hover:underline'>{title}</p>
            </Link>

            <p className='text-secondary-text mt-1'>{description}</p>
        </div>
    );
};
