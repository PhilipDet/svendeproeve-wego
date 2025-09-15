export const Footer = () => {
    return (
        <footer className="w-full bg-muted-background text-foreground text-xl py-2 px-4 items-center border-t border-gray-300">
            <ul>
                <li className="place-self-center">
                    &copy; {new Date().getFullYear()} Footer
                </li>
            </ul>
        </footer>
    );
};
