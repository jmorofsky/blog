import Link from 'next/link';
import { formatDate } from '../_shared/common_funcs';


export default function PostItem(props) {
    const id = props.post.ID;
    const title = props.post.Title;
    const description = props.post.Description;
    const date = props.post.Date;

    return (
        <div>
            <p className='mb-1 font-mono text-secondary-text text-xs'>🗓 {formatDate(date)}</p>

            <Link
                href={`/${id}`}
                className='
                    text-primary-text text-xl font-semibold 
                    hover:underline hover:text-gold-accent'
            >
                {title}
            </Link>

            <p className='mt-2 text-secondary-text'>{description}</p>

            {id > 0 &&
                <hr className='mt-12 border-[#333]' />
            }
        </div>
    );
};
