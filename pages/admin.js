import React, { useEffect, useState } from 'react'
import AdminHeader from '@/components/AdminHeader'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import Header from '@/components/Header'
import axios from 'axios'

export default function Admin() {
  const { data: session } = useSession()
  const [allArticles, setAllArticles] = useState([])
  useEffect(() => {
    axios.get('/api/articles').then(response => {
      setAllArticles(response.data)
    })
  }, [])
        
   if(session) {
    return (
      <>
        <AdminHeader />
        <div className='text-white p-4'>
          <div className='bg-white text-black rounded-md p-2 mb-4'>
            <div className='font-bold mb-4'>Welcome, {session.user.name}</div>
            <Link className='bg-gray-400 rounded-md px-2 py-1' href={'/articles/new'}>Add New Article</Link>
          </div>
          <table className='border mb-8'>
            <thead className='bg-gray-300 text-orange-500'>
              <tr>
                <th>All Articles</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allArticles.length > 0 && allArticles.map(article => (
                <tr key={article._id}>
                  <td>
                    {article.title}
                  </td>
                  <td className='flex gap-1'>
                    <Link className='bg-gray-300 flex items-center text-sm text-black px-2 rounded-md' href={'/admin/articles/edit/'+ article._id}>
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                      </>
                      <>
                        Edit
                      </>
                    </Link>
                    <Link className='bg-red-500 text-sm flex items-center px-1 rounded-md' href={'/admin/articles/delete/'+ article._id}>
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </>
                      <>
                       Delete
                      </>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className='bg-white text-black rounded-md px-2 py-1/2' onClick={() => signOut()}>Sign out</button>
        </div>
      </>
    )
   }
   return (
    <>
      <Header />
      <div className='flex justify-center mt-32'>
        <button onClick={() => signIn('google')} className='bg-white text-black rounded-md px-2 py-1'>Login with Google</button>
      </div>
    </>
   )
  
}
