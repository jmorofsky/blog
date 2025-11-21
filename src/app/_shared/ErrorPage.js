export default function ErrorPage(props) {
    const errorText = props.error

    return (
            <div className='text-center text-primary-text mt-[30vh] m-auto'>
                <h1 className='text-6xl font-black'>500</h1>
                <p className='mt-3 text-secondary-text text-lg'>There was a problem loading this page.</p>
                <p className="font-mono text-red-600">{errorText}</p>
            </div>
        )
}
