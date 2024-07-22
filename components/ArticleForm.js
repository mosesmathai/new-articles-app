import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import Spinner from './Spinner';
import { ReactSortable } from 'react-sortablejs';

export default function ArticleForm({
  _id,
  title: existingTitle,
  message: existingMessage,
  author: existingAuthor,
  images: existingImages,
}) {
  const [title, setTitle] = useState(existingTitle || '');
  const [images, setImages] = useState(existingImages || [])
  const [message, setMessage] = useState(existingMessage || '');
  const [author, setAuthor] = useState(existingAuthor || '');
  const [buttonText, setButtonText] = useState('Save');
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  

  async function saveArticle(ev) {
    ev.preventDefault();
    setButtonText('processing...');
    const data = {title, message,images, author};
    if (_id) {
      await axios.put('/api/articles', {...data, _id})
    } else {
      await axios.post('/api/articles', data)
    }
    setTitle('');
    setMessage('');
    router.push('/admin')
  } 

  async function uploadImages(ev) {
    const files = ev.target?.files
    if (files?.length > 0) {
      setIsUploading(true)
      const data = new FormData()
      for (const file of files) {
        data.append('file', file)
      }
      const res = await axios.post('/api/upload', data)
      setImages(oldImages => {
        return [...oldImages, ...res.data.links]
      })
      setIsUploading(false);
    }
  }

  function updateImageOrder(images) {
    setImages(images)
  }

  return (
    <div className='text-white form-sizing'>
      
      <form onSubmit={saveArticle}>
        <label className='rounded-sm font-bold text-orange-500'>Article Title</label>
        <input 
          type="text" 
          placeholder='Article Title'
          value={title} 
          onChange={ev => setTitle(ev.target.value)}
        />
        <label className='rounded-sm font-bold text-orange-500'>Author Name</label>
        <input 
          type="text" 
          placeholder='Author Name'
          value={author} 
          onChange={ev => setAuthor(ev.target.value)}
        />
        <label className='rounded-sm font-bold text-orange-500'>Images</label>
        <div className='flex gap-2'>
          <ReactSortable
            list={images}
            setList={updateImageOrder}
            className='flex flex-wrap gap-1'
          >
            {!!images?.length && images.map(link => (
              <div key={link} className='w-24'>
                <img src={link} alt="article image" />
              </div>
            ))}
          </ReactSortable>

          {isUploading && (
            <div className=' flex justify-center h-24 w-24'>
              <Spinner />
            </div>
          )}
          <div>
            <label className='bg-slate-300 text-sm flex flex-col justify-center items-center w-24 h-24 text-black cursor-pointer rounded-md'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
              upload
              <input type="file" onChange={uploadImages} className='hidden' />
            </label>
            {!images?.length && (
              <div>This article has no images!</div>
            )}
          </div>
        </div>
        <label className='rounded-sm font-bold text-orange-500'>Article Text</label>
        <textarea 
          placeholder='Write your article here...'
          value={message} 
          onChange={ev => setMessage(ev.target.value)}
        />
        <button className='border-2 text-black bg-gray-100/50 font-bold rounded-md' type='submit'>{buttonText}</button>
      </form>
    </div>
  )
}