import Link from 'next/link'
import { formatDate } from '../_shared/common_funcs'

export default function PostItem(props) {
    const title = props.post.Title
    const desc = props.post.Description
    const date = props.post.Date
    const ID = props.post.ID

    return (
        <div className="inline-flex w-160 pl-3 pr-3 max-[700px]:w-[90vw]">
            <div className='flex flex-col mt-3 w-full'>
                <p className='font-mono text-secondary-text text-xs mb-3'>🗓 {formatDate(date)}</p>
                <Link href={`/${ID}`} className='text-primary-text 
                text-xl mb-3 font-semibold hover:underline hover:text-gold-accent transition duration-100'>
                    {title}
                </Link>
                <p className='text-secondary-text'>{desc}</p>
            </div>
        </div>
    )
}
