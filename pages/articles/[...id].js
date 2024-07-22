import SeparateHeader from "@/components/SeparateHeader";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import axios from "axios";
import ArticleSelected from "@/components/ArticleSelected";

export default function NewArticleSelected() {
  const [newArticleSelected, setNewArticleSelected] = useState(null);
  const router = useRouter();
  const {id} = router.query;

  useEffect(() => {
    if (!id) {
      return
    } else {
      axios.get('/api/articles?id='+id).then(response => {
        setNewArticleSelected(response.data)
      })
    }
  }, [id])

  return (
    <div>
      <SeparateHeader />
      {newArticleSelected && (
        <ArticleSelected {...newArticleSelected} />
      )
      }
    </div>
  )
}