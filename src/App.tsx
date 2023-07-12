/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRef, useState } from 'react'
import { BurgerMenuIcon, IlustrationWorking, Logo } from './components/Icons'
import { ShortUrls, getShortUrl } from './services/getShortUrl'
import { toast } from 'react-hot-toast'

function App () {
  const inputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const shortUrlRef = useRef<HTMLParagraphElement>(null)
  const [shortUrls, setShortUrls] = useState<ShortUrls>()

  const handleGetStarted = () => {
    if (inputRef.current != null) {
      inputRef.current.focus()
    }
  }

  const handleShortenLink = async () => {
    if (inputRef.current != null) {
      try {
        const url = inputRef.current.value
        const res = await getShortUrl(url)
        setShortUrls(res)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleCopyLink = () => {
    if (shortUrlRef.current != null) {
      const text = shortUrlRef.current.textContent
      if (text != null) {
        navigator.clipboard.writeText(text)
      }
    }
    if (buttonRef.current != null) {
      buttonRef.current.textContent = 'Copied!'
      buttonRef.current.className = 'text-white p-2 w-48 rounded cursor-pointer bg-violet-950'
      toast.success('Copied to clipboard!')
    }
  }

  return (
    <>
      <header>
        <div className='flex flex-row justify-between items-center p-4 mt-4'>
          <Logo />
          <BurgerMenuIcon />
        </div>
      </header>
      <main>
        <figure>
          <IlustrationWorking />
        </figure>
        <div className='p-4 mt-10 flex flex-col'>
          <h1 className='font-bold text-5xl text-center'>More than just shorter links</h1>
          <p className='text-center text-xl mt-4 text-slate-400'>Build your brand's recognition and get detailed insights on how your links are performing. </p>
        </div>
        <div className='flex justify-center'>
          <button onClick={handleGetStarted} className='bg-cyan-500 text-white p-4 px-20 rounded-full mt-6 cursor-pointer hover:bg-cyan-200'>Get Started</button>
        </div>
        <section className='flex flex-col justify-center items-center p-4 mt-10 bg-violet-950 rounded-xl mx-6 h-40 gap-4'>
          <input ref={inputRef} className='rounded p-4 w-full' type='text' placeholder='Shorten a link here...' />
          <button onClick={handleShortenLink} className='bg-cyan-500 text-white p-4 w-full rounded cursor-pointer hover:bg-cyan-200'>Shorten it!</button>
        </section>
        {(shortUrls != null) &&
          <div className='flex flex-col bg-slate-300 m-4 rounded p-2 overflow-scroll gap-2 justify-center items-center text-center'>
            <span>{shortUrls.original_link.length > 30 ? shortUrls.original_link.slice(0, 30) + '...' : shortUrls.original_link}</span>
            <div className='flex flex-col gap-2 text-center items-center'>
              <p ref={shortUrlRef} className='text-cyan-500'>{shortUrls.full_share_link}</p>
              <button ref={buttonRef} onClick={handleCopyLink} className='bg-cyan-500 text-white p-2 w-48 rounded cursor-pointer'>Copy</button>
            </div>
          </div>}
        <section className='mt-20'>
          <h1 className='font-black text-4xl text-center'>Advanced Statics</h1>
          <p className='text-center text-xl mt-4 text-slate-400'>Track how your links are performing across the web with our advanced statistics dashboard</p>
        </section>
      </main>
    </>
  )
}

export default App
