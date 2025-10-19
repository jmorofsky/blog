import Link from 'next/link'
import Image from 'next/image'
import logo from '../../_assets/logo.png'

export default function Header() {
    return (
        <div className='fixed top-0 z-100 bg-nav w-full p-2 inline-flex 
        text-primary-text font-semibold border-b border-border shadow-sm shadow-secondary-text'>
            <Image className='h-8 w-16 pointer-events-none' src={logo} alt='logo' />
            <div className='ml-auto p-1'>
                <Link
                    href='/'
                    className='mr-5 pl-2 pr-2 pt-1 pb-1 hover:text-accent 
                    border-l border-r border-nav hover:border-border rounded-md transition duration-150'>
                    HOME
                </Link>
                <Link
                    href='https://jasonmorofsky.com'
                    className='pl-2 pr-2 pt-1 pb-1 hover:text-accent 
                    border-l border-r border-nav hover:border-border rounded-md transition duration-150'>
                    PORTFOLIO
                </Link>
            </div>
        </div>
    )
}
