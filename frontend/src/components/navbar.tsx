import { useState, useEffect } from "react";

import { NavbarItems, Title } from "../interfaces";

import { GetHeaderTitle, GetNavbarItems } from "../functions"


export const Navbar: React.FC = () => {
    const [headerText, setHeaderText] = useState<Title>();
    const [navbarItems, setNavbarItems] = useState<[]>([]);

    useEffect(() => {
        const fetchHeaderText = async () => {
            const title = await GetHeaderTitle();
            setHeaderText(title);
        };
        fetchHeaderText();
    }, []);

    const titleElement: JSX.Element = <h1 className="text-white font-extrabold uppercase">{headerText?.header}</h1>;


    useEffect(() => {
        const fetchNavbarItems = async () => {
            const items = await GetNavbarItems();
            setNavbarItems(items);
        };
        fetchNavbarItems();
    }, []);

    const navbarElements: JSX.Element[] = [];
    navbarItems.forEach((item: NavbarItems, index) => {
        navbarElements.push(
            <a key={index} href={item.href} className="text-zinc-300 hover:text-amber-400 text-sm capitalize">{item.name}</a>
        )
    })

    return (
        <nav className="w-4/6 flex flex-row justify-between ml-auto mr-auto">
            <div className="basis-1/4 p-4">
                {titleElement}
            </div>
            <div className="basis-1/2 flex flex-row justify-around p-4">
                {navbarElements}
            </div>
        </nav>
    )
}