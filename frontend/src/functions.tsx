import { NavbarItems, Jobs } from "./interfaces";

const IP = 'http://localhost:8000';

export async function GetHeaderTitle() {
    try {
        const response = await fetch(`${IP}/title`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.log("Henüz gelmedi");
        }
    } catch (error) {
        console.log("Hata", error);
    }
}

export async function GetNavbarItems(): Promise<NavbarItems[]> {
    try {
        const response = await fetch(`${IP}/navbar`);
        if (response.ok) {
            const data: NavbarItems[] = await response.json();
            return data;
        } else {
            console.log("Henüz gelmedi");
            return [];
        }
    } catch (error) {
        console.log('Hata', error);
        return [];
    }
}

export async function GetJobs(): Promise<Jobs[]> {
    try {
        const response = await fetch(`${IP}/jobs`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.log("Henüz Gelmedi");
            return [];
        }
    } catch (error) {
        console.log("Hata", error);
        return [];
    }
}
