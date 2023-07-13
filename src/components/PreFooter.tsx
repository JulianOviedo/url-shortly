export const PreFooter = () => {
  return (
    <div className='bg-violet-950 h-[300px] flex flex-col justify-center items-center'>
      <img className='absolute z-10' src='/icons/bg-boost-mobile.svg' alt='pre-footer-img' />
      <h1 className='text-center text-white text-4xl z-20'>Boost your links today</h1>
      <div className='flex justify-center z-20'>
        <button className='bg-cyan-500 text-white p-4 px-20 rounded-full mt-6 cursor-pointer active:bg-cyan-200'>Get Started</button>
      </div>
    </div>
  )
}
