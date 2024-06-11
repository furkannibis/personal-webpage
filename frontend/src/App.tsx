import { Navbar } from "./components/navbar"

function App() {

  return (
    <>
    {/* [url('./media/background.webp')] */}
      <div className="flex flex-col bg-cover bg-center bg-black opacity-95 w-full h-screen">
        <Navbar />
        <div className="h-full flex flex-col items-center justify-center">
          <p className="text-zinc-300 text-[40px] mb-5 uppercase">Furkan İBİŞ</p>
          <p className="text-zinc-300 text-[30px] uppercase">I'm a <span>cyber security learner</span></p>
        </div>
      </div>
    </>
  )
}

export default App
