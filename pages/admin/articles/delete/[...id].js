import AdminHeader from "@/components/AdminHeader"
import axios from "axios";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export default function DeleteArticle() {
  const router = useRouter();
  const {id} = router.query;
  const [articleInfo, setArticleInfo] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get('/api/articles?id='+id).then(response => {
        setArticleInfo(response.data)
      })
    }
  }, [id])

  function goBack() {
    router.push('/admin')
  }

  async function deleteArticle() {
    await axios.delete('/api/articles?id='+id)
    goBack()
  }

 

  return (
    <div>
      <AdminHeader />
      <div className="flex flex-col items-center mt-6">
        <p className="mb-4 text-xl">Do you want to delete article <span className="text-green-500">&quot;{articleInfo?.title}&quot;</span></p>
        <div className="flex gap-2">
          <button onClick={deleteArticle} className="bg-gray-300 text-black px-2 rounded-md">Yes</button>
          <button onClick={goBack} className="text-black px-2 rounded-md bg-red-500">No</button>
        </div>
      </div>
    </div>
  )
}