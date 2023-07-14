/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRef, useState } from 'react'
import { IlustrationWorking } from './components/Icons'
import { ShortUrls, getShortUrl } from './services/getShortUrl'
import { toast } from 'react-hot-toast'
import { ShortUrlModal } from './components/ShortUrlModal'
import { BenefitCard } from './components/BenefitsCard'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

function App () {
  const inputRef = useRef<HTMLInputElement>(null)
  const [shortUrls, setShortUrls] = useState<ShortUrls[]>([])
  const [error, setError] = useState<string>('')
  const [isLoading, setIsloading] = useState<boolean>(false)

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
          setIsloading(true)
          const res = await getShortUrl(url)
          setShortUrls((prevShortUrls) => [...prevShortUrls, res])
          setError('')
          inputRef.current.value = ''
          setIsloading(false)
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
      <Header />

      <main className='relative z-20'>

        <section className='md:flex md:flex-row-reverse md:justify-between md:items-center md:mt-10 lg:pl-20'>
          <figure className='relative -z-10 flex justify-end md:w-[50%]'>
            <IlustrationWorking />
          </figure>

          <div className='p-4 mt-10 text-center flex flex-col items-center md:items-start md:text-start md:w-[50%] md:mt-0'>
            <h1 className='font-bold text-5xl'>More than just shorter links</h1>
            <p className='text-xl mt-4 text-slate-400'>Build your brand's recognition and get detailed insights on how your links are performing. </p>
            <button onClick={handleGetStarted} className='bg-cyan-500 text-white p-4 px-12 rounded-full mt-6 cursor-pointer active:bg-cyan-200'>Get Started</button>
          </div>
        </section>

        <section className='relative flex flex-col justify-center items-center p-4 mt-10 bg-violet-950 rounded-xl mx-6 h-40 gap-4 lg:mx-20'>

          <img className='absolute top-0 right-0 md:hidden' src='/icons/bg-shorten-mobile.svg' alt='stain' />
          <img className='absolute top-0 right-0 h-full hidden md:flex w-full' src='/icons/bg-shorten-desktop.svg' alt='stain' />

          <div className='z-10 md:w-full md:flex md:flex-row md:gap-8 md:items-center'>
            <input ref={inputRef} className='rounded p-4 w-full mb-2 md:mb-0' type='text' placeholder='Shorten a link here...' />
            <button onClick={handleShortenLink} className=' bg-cyan-500 text-white p-4 w-full md:w-48 rounded cursor-pointer hover:bg-cyan-200'>{isLoading ? 'Shorting...' : 'Shorten It'}</button>
            {error.length > 0 && <p className='text-red-500 text-center z-20 md:hidden'>{error}</p>}
          </div>
          {error.length > 0 && <p className='text-red-500 text-center z-20 hidden md:flex'>{error}</p>}
        </section>

        <section className='bg-slate-100 -mt-20 relative -z-20 pt-20 pb-16'>
          {(shortUrls.length > 0) &&
            <ShortUrlModal responseApi={shortUrls} />}

          <section className='my-20 md:mx-44 md:my-32 lg:mb-44 lg:my-24'>
            <h1 className='font-black text-4xl text-center'>Advanced Statics</h1>
            <p className='text-center text-xl mt-4 text-slate-400'>Track how your links are performing across the web with our advanced statistics dashboard</p>
          </section>

          <section className='flex flex-col gap-20 lg:flex-row lg:justify-center lg:gap-6'>
            <div className='lg:-mt-24'>
              <BenefitCard
                title='Brand Recognition'
                description='Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instil confidence in your content.'
                image='/icons/icon-brand-recognition.svg'
              />
            </div>
            <div className='absolute top-[30%] left-[49.8%] lg:top-[70%] lg:left-[20%] -z-10 xl:ml-[5%] md:lg-[500px]'>
              <div className='h-[800px] w-2 lg:h-2 lg:w-[800px] bg-cyan-500 absolute -z-10' />
            </div>
            <div className='lg:-mt-12'>
              <BenefitCard
                title='Detailed Records'
                description='Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.'
                image='/icons/icon-detailed-records.svg'
              />
            </div>
            <BenefitCard
              title='Fully Customizable'
              description='Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.'
              image='/icons/icon-fully-customizable.svg'
            />
          </section>
        </section>

        <Footer />

      </main>
    </>
  )
}

export default App
