import { formatDate } from '../_common'

export default function PostItem(props) {
    const title = props.post.Title
    const desc = props.post.Description
    const date = props.post.Date
    const edited = props.post.Edited

    return (
        <div className="inline-flex w-160 pl-3 pr-3 max-[700px]:w-[90vw]">
            <div className='flex flex-col mt-3 w-full'>
                <p className='font-mono text-secondary-text text-xs mb-3'>🗓 {formatDate(date)}</p>
                <p className='text-primary-text text-xl mb-3 font-semibold'>
                    <span className='hover:underline hover:text-gold-accent transition duration-100'>{title}</span>
                </p>
                <p className='text-secondary-text'>{desc}</p>
            </div>
        </div>
    )
}
