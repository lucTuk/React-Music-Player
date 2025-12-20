import { useEffect, useState } from "react";

export function ThemeToggle() {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(
        document.body.classList.contains("dark")
    );

    const toggleTheme = () => {
        const newIsDarkMode = !isDarkMode;
        setIsDarkMode(newIsDarkMode);

        if (newIsDarkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }

        localStorage.setItem("theme", newIsDarkMode ? "dark" : "light");
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setIsDarkMode(true);
            document.body.classList.add("dark");
        } else {
            setIsDarkMode(false);
            document.body.classList.remove("dark");
        }
    }, []);

    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="sr-only peer"
                checked={isDarkMode}
                onChange={toggleTheme}
            />
            <div className="group peer bg-background rounded-full duration-300 w-16 h-8 ring-2 ring-[#c5c5c5] after:duration-300 after:bg-[#c5c5c5] peer-checked:after:bg-[#2e2e2e] peer-checked:ring-[#2e2e2e] after:rounded-full after:absolute after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95"></div>
        </label>
    );
}
