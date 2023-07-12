/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRef, useState } from 'react'
import { BurgerMenuIcon, IlustrationWorking, Logo } from './components/Icons'
import { ShortUrls, getShortUrl } from './services/getShortUrl'
import { toast } from 'react-hot-toast'
import { ShortUrlModal } from './components/ShortUrlModal'

function App () {
  const inputRef = useRef<HTMLInputElement>(null)
  const [shortUrls, setShortUrls] = useState<ShortUrls[]>([])
  const [error, setError] = useState<string>('')

  const handleGetStarted = () => {
    if (inputRef.current != null) {
      inputRef.current.focus()
    }
  }

  const handleShortenLink = async () => {
    if (inputRef.current != null) {
      const url = inputRef.current.value
      const urlRegex = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/
      if (urlRegex.test(url)) {
        try {
          const res = await getShortUrl(url)
          setShortUrls((prevShortUrls) => [...prevShortUrls, res])
          setError('')
          inputRef.current.value = ''
        } catch (error) {
          toast.error('Something went wrong, please try again later')
          console.log(error)
        }
      } else {
        setError('Please enter a valid URL')
        console.log('Please enter a valid URL')
      }
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
          <button onClick={handleGetStarted} className='bg-cyan-500 text-white p-4 px-20 rounded-full mt-6 cursor-pointer active:bg-cyan-200'>Get Started</button>
        </div>
        <section className='relative flex flex-col justify-center items-center p-4 mt-10 bg-violet-950 rounded-xl mx-6 h-40 gap-4'>
          <img className='absolute top-0 right-0' src='../public/icons/bg-shorten-mobile.svg' alt='stain' />
          <div className='z-10'>
            <input ref={inputRef} className='rounded p-4 w-full mb-2' type='text' placeholder='Shorten a link here...' />
            <button onClick={handleShortenLink} className=' bg-cyan-500 text-white p-4 w-full rounded cursor-pointer hover:bg-cyan-200'>Shorten it!</button>
            {error.length > 0 && <p className='text-red-500 text-center'>{error}</p>}
          </div>
        </section>
        {(shortUrls.length > 0) &&
          <ShortUrlModal responseApi={shortUrls} />}
        <section className='mt-20'>
          <h1 className='font-black text-4xl text-center'>Advanced Statics</h1>
          <p className='text-center text-xl mt-4 text-slate-400'>Track how your links are performing across the web with our advanced statistics dashboard</p>
        </section>
      </main>
    </>
  )
}

export default App
