import Link from "next/link"
import { useRouter } from 'next/router'

export default function SeparateHeader() {
  const inactiveLink = 'rounded-md px-2'
  const activeLink = 'bg-black '+ inactiveLink
  const router = useRouter()
  const {pathname} = router 
  return (
    <header className='bg-orange-500 shadow-md shadow-orange-300/50 px-3 py-6 h-10 flex justify-between  items-center text-white'>
      <div className='font-bold flex gap-2 text-xl'>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
          </svg>
        </div>
        <div>
          Rx Media
        </div> 
      </div>
      <nav className='flex gap-2'>
        <Link className={pathname === '/'? activeLink : inactiveLink} href={'/'}>Home</Link>
      </nav>
    </header>
  )
}