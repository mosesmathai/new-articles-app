import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import Spinner from './Spinner';
import { ReactSortable } from 'react-sortablejs';

export default function ArticleSelected({
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
  const [activeImage, setActiveImage] = useState(images[0])


  return (
    <div className='flex justify-center'>
      <div className='article-wrapper pt-6 pb-20'>
        <div className='flex flex-col items-center'>
          <div className="text-orange-500 mb-8 text-xl font-bold">{title}</div>
          <div className="mb-2">
            <img className="rounded-md image-height" src={activeImage} alt="article image" />
          </div>
          <div className='flex gap-2'>
            {images.map(image => (
              <button onClick={() => setActiveImage(image)} key={image._id}>
                <img className='w-14 h-14 rounded-md' src={image} alt="selected image" />
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 mb-6 text-gray-400"><span className="font-bold secondary-font-size text-yellow-400 ">Written By&#58;</span> {author} </div>
        <div className=" whitespace-pre-wrap">{message}</div>
      </div>
    </div>
  )
}