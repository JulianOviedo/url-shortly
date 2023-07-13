import { Logo } from './Icons'

export const FooterLinks = () => {
  const links = [
    {
      title: 'Features',
      subTitles: ['Link Shortening', 'Branded Links', 'Analytics']
    },
    {
      title: 'Resources',
      subTitles: ['Blog', 'Developers', 'Support']
    },
    {
      title: 'Company',
      subTitles: ['About', 'Our Team', 'Careers', 'Contact']
    }
  ]

  const socialMediaPaths = ['/icons/icon-twitter.svg', '/icons/icon-pinterest.svg', '/icons/icon-facebook.svg', '/icons/icon-instagram.svg']

  return (
    <div className='bg-slate-800 flex flex-col justify-center items-center text-center'>
      <div className='p-10'>
        <Logo color='white' />
      </div>
      {links.map((section) => {
        return (
          <div className='text-white flex flex-col gap-4' key={section.title}>
            <h2 className='text-2xl mt-4'>{section.title}</h2>
            <ul className='text-slate-400 flex flex-col gap-2'>
              {section.subTitles.map((link) => {
                return (<li className='cursor-pointer' key={link}><a href='#'>{link}</a></li>)
              })}
            </ul>
          </div>
        )
      })}
      <div />
      <div className='m-8 flex flex-row gap-8'>
        {socialMediaPaths.map(paths => {
          return (
            <img className='cursor-pointer' src={paths} alt={paths} key={paths} />
          )
        })}
      </div>
    </div>
  )
}
