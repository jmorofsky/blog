import EditContainer from "./_components/EditContainer"


export default async function EditPost({ params }) {
    const { ID } = await params

    return <EditContainer ID={ID} />
}
