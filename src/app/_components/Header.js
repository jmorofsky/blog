import Link from 'next/link'
import Image from 'next/image'
import logo from '../../assets/logo.png'

export default function Header() {
    return (
        <div className='mb-10 bg-nav w-full p-2 inline-flex text-primary-text font-bold'>
            <Image className='h-8 w-16' src={logo} alt="Return home" title="Home" />
            <div className='ml-auto p-1 pr-2'>
                <Link
                    href='/'
                    className='pr-5 hover:text-accent transition duration-150'>
                    Home
                </Link>
                <Link
                    href='https://jasonmorofsky.com'
                    className='hover:text-accent transition duration-150'>
                    Portfolio
                </Link>
            </div>

        </div>
    )
}
