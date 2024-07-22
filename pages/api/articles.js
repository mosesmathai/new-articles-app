import { mongooseConnect } from "@/lib/mongoose";
import Article from "@/models/Article";

export default async function handler(req, res) {
  await mongooseConnect();
  const {method} = req; 
  
  if (method === 'POST') {
    const {title,message,author,images} = req.body
    const articleDoc = await Article.create({
      title,message,author,images
    })
    res.json(articleDoc)
  }

  if (method === 'GET') {
    if(req.query?.id) {
      res.json(await Article.findOne({_id:req.query.id}))
    } else {
      const allArticles = await Article.find().sort({createdAt: -1});
      res.json(allArticles)
    }  
  }

  if (method === 'PUT') {
    const {title,author, message, images, _id} = req.body;
    await Article.updateOne({_id}, {title, message, images, author})
    res.json(true)
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Article.deleteOne({_id:req.query.id})
      res.json(true)
    }
    
  }
}
