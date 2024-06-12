import { Navbar } from "../components/navbar"
import { HomeInformation } from "../components/homeInformation"
export const HomePart = () => {
    return (
            <>
                {/* [url('./media/background.webp')] */}
                <div id="home" className="flex flex-col bg-cover bg-center bg-black opacity-95 w-full h-screen">
                    <Navbar />
                    <HomeInformation />
                </div>
            </>
    )
}