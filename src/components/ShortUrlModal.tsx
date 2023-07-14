import { useRef } from 'react'
import { toast } from 'react-hot-toast'
import { ShortUrls } from '../services/getShortUrl'

interface ShortUrlModalProps {
  responseApi: ShortUrls[]
}

export const ShortUrlModal = ({ responseApi }: ShortUrlModalProps) => {
  const shortUrlRefs = useRef<Array<HTMLParagraphElement | null>>([])
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([])

  const handleCopyLink = (index: number) => {
    const shortUrlRef = shortUrlRefs.current[index]
    const buttonRef = buttonRefs.current[index]

    if (shortUrlRef != null) {
      const text = shortUrlRef.textContent
      console.log('hols')
      if (text != null) {
        navigator.clipboard.writeText(text)
      }
    }
    if (buttonRef != null) {
      console.log('qonda')
      buttonRef.textContent = 'Copied!'
      buttonRef.className = 'text-white p-2 w-48 rounded cursor-pointer bg-violet-950'
      toast.success('Copied to clipboard!')
    }
  }

  return (
    <>
      {responseApi.length > 0 &&
        responseApi.map((shortUrls, index) => {
          // Create new refs if necessary
          if (index >= shortUrlRefs.current.length) {
            shortUrlRefs.current.push(null)
            buttonRefs.current.push(null)
          }

          return (
            <div key={shortUrls.code} className='flex flex-col bg-slate-300 m-4 rounded p-2 md:m-6 overflow-scroll gap-2 justify-center items-center text-center z-10 md:flex-row md:justify-between md:px-4 md:mx-20'>
              <span>
                {shortUrls.original_link.length > 30
                  ? `${shortUrls.original_link.slice(0, 30)}...`
                  : shortUrls?.original_link ?? ''}
              </span>
              <div className='flex flex-col gap-2 text-center items-center md:flex-row md:gap-8'>
                <p ref={(ref) => (shortUrlRefs.current[index] = ref)} className='text-cyan-500'>
                  {shortUrls?.full_share_link}
                </p>
                <button
                  ref={(ref) => (buttonRefs.current[index] = ref)}
                  onClick={() => handleCopyLink(index)}
                  className='bg-cyan-500 text-white p-2 w-48 rounded cursor-pointer'
                >
                  Copy
                </button>
              </div>
            </div>
          )
        })}
    </>
  )
}
