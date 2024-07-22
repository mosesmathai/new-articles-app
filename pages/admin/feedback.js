import AdminHeader from "@/components/AdminHeader"
import axios from "axios"
import { useEffect, useState } from "react"

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get('/api/feedback').then(response => {
      setFeedbacks(response.data)
    })
  }, [])

  return (
    <div>
      <AdminHeader />
      <div className="flex justify-center mt-6">
        <table>
          <thead className="bg-slate-300 text-black">
            <tr>
              <th>Username</th>
              <th>Feedback Message</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map(feedback => (
              <tr key={feedback?._id}>
                <td>{feedback?.userName}</td>
                <td>{feedback?.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}