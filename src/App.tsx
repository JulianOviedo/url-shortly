/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRef, useState } from 'react'
import { IlustrationWorking, Logo } from './components/Icons'
import { ShortUrls, getShortUrl } from './services/getShortUrl'
import { toast } from 'react-hot-toast'
import { ShortUrlModal } from './components/ShortUrlModal'
import { BenefitCard } from './components/BenefitsCard'
import { Footer } from './components/Footer'
import { BurgerMenu } from './components/BurgerMenu'

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
          <Logo color='#34413D' />
          <BurgerMenu />
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
          <img className='absolute top-0 right-0' src='/icons/bg-shorten-mobile.svg' alt='stain' />
          <div className='z-10'>
            <input ref={inputRef} className='rounded p-4 w-full mb-2' type='text' placeholder='Shorten a link here...' />
            <button onClick={handleShortenLink} className=' bg-cyan-500 text-white p-4 w-full rounded cursor-pointer hover:bg-cyan-200'>Shorten it!</button>
            {error.length > 0 && <p className='text-red-500 text-center'>{error}</p>}
          </div>
        </section>
        <section className='bg-slate-100 -mt-20 relative -z-20 pt-20 pb-16'>
          {(shortUrls.length > 0) &&
            <ShortUrlModal responseApi={shortUrls} />}

          <section className='my-20'>
            <h1 className='font-black text-4xl text-center'>Advanced Statics</h1>
            <p className='text-center text-xl mt-4 text-slate-400'>Track how your links are performing across the web with our advanced statistics dashboard</p>
          </section>

          <BenefitCard
            title='Brand Recognition'
            description='Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instil confidence in your content.'
            image='/icons/icon-brand-recognition.svg'
          />
          <div className='flex justify-center items-center relative -z-10'>
            <div className='h-48 w-2 bg-cyan-500 absolute -z-10' />
          </div>
          <BenefitCard
            title='Detailed Records'
            description='Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.'
            image='/icons/icon-detailed-records.svg'
          />
          <div className='flex justify-center items-center relative -z-10'>
            <div className='h-48 w-2 bg-cyan-500 absolute -z-10' />
          </div>
          <BenefitCard
            title='Fully Customizable'
            description='Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.'
            image='/icons/icon-fully-customizable.svg'
          />
        </section>

        <Footer />

      </main>
    </>
  )
}

export default App
