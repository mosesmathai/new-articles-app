import AdminHeader from "@/components/AdminHeader"
import ArticleForm from "@/components/ArticleForm"
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditArticle() {
  const [articleInfo, setArticleInfo] = useState(null);
  const router = useRouter();
  const {id} = router.query;

  useEffect(() => {
    if (!id) {
      return
    } else {
      axios.get('/api/articles?id='+id).then(response => {
        setArticleInfo(response.data)
      })
    }
  }, [id])

  return (
    <>
      <AdminHeader />
      <div className="flex flex-col items-center mt-6">
        <h1 className="text-xl font-bold">Edit Article</h1>
        {articleInfo && (
          <ArticleForm {...articleInfo} />
        )}
      </div>
    </>
  )
}