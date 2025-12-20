import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function MusicHeader() {
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    return (
        <header className="flex justify-between items-center px-5">
            <h1 className="font-open-sans text-4xl font-extrabold">Music</h1>
            {openMenu ? (
                <ChevronDown
                    className="hover:opacity-75 transition-all duration-300 transform -rotate-180"
                    onClick={() => setOpenMenu(!openMenu)}
                />
            ) : (
                <ChevronDown
                    className="hover:opacity-75 transition-all duration-300"
                    onClick={() => setOpenMenu(!openMenu)}
                />
            )}
            <div
                className={`flex transition-all duration-250 absolute top-[-15vh] ${
                    openMenu
                        ? "transform -translate-y-[-20vh]"
                        : "transform -translate-y-5"
                } right-[5vw] z-10 p-5 backdrop-blur-xl shadow-xl`}
            >
                <ul className="flex flex-col gap-3 text-left text-xl font-bold">
                    <li>
                        <ThemeToggle />
                    </li>
                </ul>
            </div>
        </header>
    );
}
