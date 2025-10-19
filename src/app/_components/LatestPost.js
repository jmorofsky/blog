import Image from 'next/image'
import { _formatDate } from '../_common'

export default function LatestPost(props) {
    const title = props.post.Title
    const date = props.post.Date
    const edited = props.post.Edited

    return (
        <div className="flex flex-col row-span-2 
        p-3 rounded-lg hover:bg-[#282828] hover:ring-4 hover:ring-[#202020] transition duration-150">
            <h1
                className='text-primary-text text-xl font-semibold whitespace-nowrap'>
                LATEST POST
            </h1>
            <p
                className='text-secondary-text text-sm text-left pt-1'>
                WHAT I'VE BEEN DOING RECENTLY
            </p>

            <hr className='border-gold-accent mt-4 mb-4' />

            <p className='font-mono text-secondary-text text-xs mb-4'>
                🗓 {_formatDate(date)}  {edited &&
                    <em
                        className='text-accent'>
                        &emsp;[Edited: {_formatDate(edited)}]
                    </em>
                }
            </p>

            <Image
                src={require(`../../_assets/post_images/${props.post.ID}.png`)}
                alt=''
                className="h-120 w-160 mb-4 rounded-sm object-cover shadow-md shadow-accent"
                priority={false}
            />
            <p className='text-primary-text text-3xl font-semibold'>{title}</p>
        </div>
    )
}
