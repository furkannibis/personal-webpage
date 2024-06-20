import React, { useState, useEffect } from "react";
import { NavbarItems, Title } from "../interfaces";
import { GetHeaderTitle, GetNavbarItems } from "../functions";
import { LoadingCircle } from "./loading";

export const Navbar: React.FC = () => {
    const [headerText, setHeaderText] = useState<Title | null>(null);
    const [navbarItems, setNavbarItems] = useState<NavbarItems[]>([]);
    const [loadingHeader, setLoadingHeader] = useState(true);
    const [loadingNavbar, setLoadingNavbar] = useState(true);
    const [headerError, setHeaderError] = useState(false);
    const [navbarError, setNavbarError] = useState(false);

    const fetchHeaderText = async () => {
        try {
            const title = await GetHeaderTitle();
            if (title) {
                setHeaderText(title);
                setLoadingHeader(false);
            } else {
                setTimeout(fetchHeaderText, 2000);
            }
        } catch (error) {
            setHeaderError(true);
            setTimeout(fetchHeaderText, 2000);
        }
    };

    const fetchNavbarItems = async () => {
        try {
            const items = await GetNavbarItems();
            if (items.length > 0) {
                setNavbarItems(items);
                setLoadingNavbar(false);
            } else {
                setTimeout(fetchNavbarItems, 2000);
            }
        } catch (error) {
            setNavbarError(true);
            setTimeout(fetchNavbarItems, 2000);
        }
    };

    useEffect(() => {
        fetchHeaderText();
        fetchNavbarItems();
    }, []);

    let titleElement: JSX.Element;
    if (loadingHeader) {
        titleElement = <LoadingCircle />;
    } else if (headerError) {
        titleElement = <p className="text-red-500">Error loading title</p>;
    } else if (headerText) {
        titleElement = <a href="#" className="text-white font-extrabold uppercase">{headerText.header}</a>;
    } else {
        titleElement = <p>No title available</p>;
    }

    let navbarElements: JSX.Element[];
    if (loadingNavbar) {
        navbarElements = [<LoadingCircle key="loading" />];
    } else if (navbarError) {
        navbarElements = [<p key="error" className="text-red-500">Error loading navbar items</p>];
    } else if (navbarItems.length > 0) {
        navbarElements = navbarItems.map((item, index) => (
            <a key={index} href={item.href} className="text-zinc-300 hover:text-amber-400 text-sm capitalize">{item.name}</a>
        ));
    } else {
        navbarElements = [<p key="no-items">No navbar items available</p>];
    }

    return (
        <nav className="w-4/6 flex flex-row justify-between ml-auto mr-auto">
            <div className="basis-1/4 p-4">
                {titleElement}
            </div>
            <div className="basis-1/2 flex flex-row justify-around p-4">
                {navbarElements}
            </div>
        </nav>
    );
};
