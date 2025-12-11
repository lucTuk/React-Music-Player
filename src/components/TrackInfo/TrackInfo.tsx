interface Props {
    title?: string;
    artist?: string;
}

export function TrackInfo({ title = "unknown", artist = "unknown" }: Props) {
    return (
        <>
            <div className="flex items-center flex-col h-[20vh]">
                <h2 className="font-open-sans text-3xl font-black">{title}</h2>
                <p className="font-open-sans text-[#B6B6B6] text-xl">
                    {artist}
                </p>
            </div>
        </>
    );
}
