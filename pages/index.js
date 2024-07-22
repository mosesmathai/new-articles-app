import Header from "@/components/Header"
import { useEffect, useState } from "react"
import axios from "axios";
import Spinner from "@/components/Spinner";
import Link from "next/link";

export default function Home() {
  const [allArticles, setAllArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    axios.get('/api/articles').then(response => {
      setAllArticles(response.data)
      setIsLoading(false)
    })
  }, [])

  return (
    <main>
      <Header />
      <div className="flex justify-center">
        <div className="mt-4 article-content">
          {isLoading && (
            <div className="flex justify-center">
              <Spinner />
            </div>
          )}
          {allArticles.map(article => (
            <div className="mb-2 pb-7 border border-gray-500 border-t-0 border-l-0 border-r-0" key={article._id}>
              <div className="flex justify-center">
                <div className="text-orange-500 mb-8 text-xl font-bold">{article?.title}</div>
              </div>
              <div className="mb-2 flex justify-center">
                <img className="rounded-md image-height" src={article?.images[0]} alt="article image" />
              </div>
              <div className="mb-2 text-gray-400"><span className="font-bold secondary-font-size">Posted on&#58;</span> <span className="italic font-size">{(new Date(article.createdAt)).toLocaleString()}</span> </div>
              <div className="mb-6 text-gray-400"><span className="font-bold secondary-font-size">Written By&#58;</span> {article?.author} </div>
              <div className=" whitespace-pre-wrap line-clamp-6">{article?.message}</div>
              <Link className="text-green-400" href={'/articles/'+ article._id}>View More</Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
