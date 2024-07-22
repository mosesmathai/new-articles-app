import ArticleForm from '@/components/ArticleForm';
import AdminHeader from '@/components/AdminHeader'

export default function Article() {
  return (
    <>
      <AdminHeader />
      <div className='flex flex-col items-center'>
        <h1 className='mt-3 font-bold text-xl'>Create Article</h1>
        <ArticleForm />
      </div>
    </>
  ) 
}
