import Image from 'next/image'
import Link from 'next/link'
import profile from '../../_assets/profile.jpg'
import linkedin from '../../_assets/LinkedIn-icon.png'
import github from '../../_assets/GitHub-icon.png'

export default function Sidebar() {
    return (
        <div className='fixed top-0 h-full bg-nav p-2 border-r border-border shadow-sm shadow-secondary-text w-60 max-[1000px]:hidden'>
            <div className='flex flex-col mt-25 items-center'>
                <Image className='h-35 w-35 rounded-full pointer-events-none ring-3 ring-border' src={profile} alt='Jason Morofsky' />
                <p className="mt-4 text-primary-text font-mono">JASON MOROFSKY</p>

                <p className='mt-7 pl-4 pr-4 text-secondary-text text-[15px] text-justify'>
                    I am a full-stack software engineer currently working at&nbsp;
                    <Link href="https://www.redviolet.com/" className='text-accent' >
                        <span className='text-[#8b29a6]'>red</span>&nbsp;
                        <span className='text-[#E50019]'>violet</span>&thinsp;
                        <span className='text-sm'>↗</span>
                    </Link>
                    . In my free time,
                    I like to experiment with my homelab and AI.
                </p>

                <div className='self-start mt-8 ml-2 text-primary-text font-mono italic'>
                    <Link href="https://www.linkedin.com/in/jason-morofsky/">
                        <Image src={linkedin} alt='LinkedIn' className='h-6 w-9 inline' />
                        <span className='underline hover:text-secondary-text transition duration-150'>
                            LinkedIn
                        </span>&nbsp;
                        <span className='text-sm'>↗</span>
                    </Link>
                    <br />
                    <Link href="https://github.com/jmorofsky/" className='pl-2'>
                        <Image src={github} alt='GitHub' className='h-4 w-4 inline' />
                        <span className='underline pl-3 hover:text-secondary-text transition duration-150'>
                            GitHub
                        </span>&nbsp;
                        <span className='text-sm'>↗</span>
                    </Link>
                    <br />
                    <Link href="mailto:contact@jasonmorofsky.com" className='pl-[7px]'>
                        <span className='not-italic text-lg text-[#FFF]'>✉</span>
                        <span className='underline pl-3 hover:text-secondary-text transition duration-150'>
                            Email
                        </span>&nbsp;
                        <span className='text-sm'>↗</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
