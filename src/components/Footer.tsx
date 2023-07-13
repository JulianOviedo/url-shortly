import { FooterLinks } from './FooterLinks'
import { PreFooter } from './PreFooter'

export const Footer = () => {
  return (
    <footer className='flex flex-col'>
      <PreFooter />
      <FooterLinks />
    </footer>
  )
}
