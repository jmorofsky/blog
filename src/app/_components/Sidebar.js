import Image from 'next/image';
import Link from 'next/link';
import profile from '@/_assets/profile.jpg';
import linkedin from '@/_assets/LinkedIn.png';
import github from '@/_assets/GitHub.png';


export default function Sidebar() {
    return (
        <div className='
            fixed top-0 h-full bg-nav p-2 border-r 
            border-border shadow-sm shadow-secondary-text 
            w-60 max-[1080px]:hidden flex flex-col items-center gap-7'
        >
            <div className='mt-25'>
                <Image
                    src={profile}
                    alt='Jason Morofsky'
                    className='h-35 w-35 rounded-full pointer-events-none ring-3 ring-border'
                />
                <p className='mt-4 text-primary-text font-mono'>JASON MOROFSKY</p>
            </div>

            <p className='px-4 text-secondary-text text-[15px] text-justify'>
                I am a full-stack software engineer currently working at
                <Link href="https://www.redviolet.com/" className='text-accent' >
                    <span className='text-[#8b29a6]'> red </span>
                    <span className='text-[#E50019]'> violet</span>
                    <span className='text-sm'>&thinsp;↗</span>
                </Link>
                . In my free time, I like to experiment with my homelab and AI.
            </p>

            <div className='self-start ml-2 flex flex-col text-primary-text font-mono italic'>
                <Link href="https://www.linkedin.com/in/jason-morofsky/">
                    <Image src={linkedin} alt='LinkedIn' className='h-6 w-9 inline' />
                    <span className='underline hover:text-secondary-text'>
                        LinkedIn
                    </span>&nbsp;
                    <span className='text-sm'>↗</span>
                </Link>

                <Link href="https://github.com/jmorofsky/" className='pl-2'>
                    <Image src={github} alt='GitHub' className='h-4 w-4 inline' />
                    <span className='pl-3 underline hover:text-secondary-text'>
                        GitHub
                    </span>&nbsp;
                    <span className='text-sm'>↗</span>
                </Link>

                <Link href="mailto:contact@jasonmorofsky.com" className='pl-[7px]'>
                    <span className='not-italic text-lg text-white'>✉</span>
                    <span className='pl-3 underline hover:text-secondary-text'>
                        Email
                    </span>&nbsp;
                    <span className='text-sm'>↗</span>
                </Link>
            </div>
        </div>
    );
};
