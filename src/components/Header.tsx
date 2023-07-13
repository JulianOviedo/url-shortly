import { BurgerMenu } from './BurgerMenu'
import { Logo } from './Icons'

export const Header = () => {
  return (
    <header>
      <div className='flex flex-row justify-between items-center p-4 mt-4 md:hidden'>
        <Logo color='#34413D' />
        <BurgerMenu />
      </div>

      <div className='flex-row justify-between items-center p-4 mt-4 hidden md:flex'>
        <div className='flex flex-row items-center gap-8'>
          <Logo color='#34413D' />
          <ul className='flex flex-row gap-4 text-slate-400 items-center'>
            <li>
              <a href='#'>Features</a>
            </li>
            <li>
              <a href='#'>Pricing</a>
            </li>
            <li>
              <a href='#'>Resources</a>
            </li>
          </ul>
        </div>
        <div className='flex flex-row gap-6'>
          <button className='text-slate-400 p-2 px-6 rounded-full cursor-pointer hover:bg-cyan-200 hover:text-slate-700'>
            Login
          </button>
          <button className='bg-cyan-500 text-white p-2 px-6 rounded-full cursor-pointer hover:bg-cyan-200 hover:text-slate-700'>
            Sign Up
          </button>
        </div>
      </div>
    </header>
  )
}
