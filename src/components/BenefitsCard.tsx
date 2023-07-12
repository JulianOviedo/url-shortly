interface BenefitCardProps {
  title: string
  description: string
  image: string

}

export const BenefitCard = ({ title, description, image }: BenefitCardProps) => {
  return (
    <div className='flex justify-center items-center mb-20'>
      <article className='w-80 h-80 flex flex-col  rounded bg-white-200 justify-center items-center p-6 text-center bg-white shadow-xl'>
        <div className='bg-violet-950 rounded-full w-20 h-20 flex justify-center items-center -mt-24'>
          <img src={image} alt='Benefício' />
        </div>
        <h1 className='font-extrabold text-2xl text-center mt-8'>{title}</h1>
        <p className='text-center text-lg mt-4 text-slate-400'>{description}</p>
      </article>
    </div>
  )
}
