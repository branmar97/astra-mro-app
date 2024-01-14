type InfoCardProps = {
    title: string
    content: string | number
}

export default function InfoCard({
    title,
    content,
}: InfoCardProps) {
    return (
        <div className='flex flex-col justify-start space-y-1 p-4 bg-white rounded-lg shadow-card w-48 overflow-x-clip whitespace-nowrap'>
            <h2 className='text-xs text-gray-600 font-bold'>{title}</h2>
            <span className='text-xl font-medium'>{content}</span>
        </div>
    )
}