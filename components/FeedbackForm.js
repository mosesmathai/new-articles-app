import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';

export default function FeedbackForm({
  _id,
  userName: existingUserName,
  message: existingMessage,
}) {
  const [userName, setUserName] = useState(existingUserName || '');
  const [message, setMessage] = useState(existingMessage || '');
  const [buttonText, setButtonText] = useState('Save');
  const router = useRouter();

  async function saveFeedback(ev) {
    ev.preventDefault();
    setButtonText('processing...')
    const data = {userName, message};
    if (_id) {
      await axios.put('/api/feedback', {...data, _id})
    } else {
      await axios.post('/api/feedback', data)
    }
    setUserName('');
    setMessage('');
    router.push('/')
  } 

  return (
    <div className='text-white flex justify-center'> 
      <form onSubmit={saveFeedback} className='form-sizing'>
        <label>User Name</label>
        <input 
          type="text" 
          placeholder='user name'
          value={userName} 
          onChange={ev => setUserName(ev.target.value)}
        />
        <label>Feedback</label>
        <textarea 
          placeholder='Write your feedback here...'
          value={message} 
          onChange={ev => setMessage(ev.target.value)}
        />
        <button className='border-2 text-black bg-gray-100/50 font-bold rounded-md' type='submit'>{buttonText}</button>
      </form>
    </div>
  )
}