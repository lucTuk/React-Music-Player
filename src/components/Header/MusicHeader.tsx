import { ChevronDown } from "lucide-react";

export function MusicHeader() {
    return (
        <header className="flex justify-between items-center px-5">
            <h1 className="font-open-sans text-4xl font-extrabold">Music</h1>
            <ChevronDown />
        </header>
    );
}
