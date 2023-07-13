/* eslint-disable react/jsx-closing-tag-location */
import { useState } from 'react'
import { BurgerMenuIcon } from './Icons'

export const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleBurgerMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button onClick={handleToggleBurgerMenu}>
        <BurgerMenuIcon />
      </button>
      <div
        className={`absolute z-50 w-80 mr-8 h-[350px] top-0 right-0 bg-violet-950 rounded-xl mt-20 text-center text-white flex flex-col items-center transition-opacity duration-700 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <ul className='flex flex-col gap-6 mt-8'>
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
        <hr className='w-[90%] mt-6 border-slate-600' />
        <button className='text-white p-4 px-20 rounded-full m-4 cursor-pointer hover:bg-cyan-200 hover:text-slate-700'>
          Login
        </button>
        <button className='bg-cyan-500 text-white p-4 px-20 rounded-full cursor-pointer hover:bg-cyan-200 hover:text-slate-700'>
          Sign Up
        </button>
      </div>
    </>
  )
}
