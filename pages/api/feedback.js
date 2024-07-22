import { mongooseConnect } from "@/lib/mongoose";
import Feedback from "@/models/Feedback";

export default async function handler(req, res) {
  await mongooseConnect();
  const {method} = req; 
  
  if (method === 'POST') {
    const {userName,message} = req.body
    const feedbackDoc = await Feedback.create({
      userName,message,
    })
    res.json(feedbackDoc)
  }

  if (method === 'GET') {
    if(req.query?.id) {
      res.json(await Feedback.findOne({_id:req.query.id}))
    } else {
      const allFeedbacks = await Feedback.find().sort({createdAt: -1});
      res.json(allFeedbacks)
    }  
  }

  if (method === 'PUT') {
    const {userName, message, _id} = req.body;
    await Feedback.updateOne({_id}, {userName, message})
    res.json(true)
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Feedback.deleteOne({_id:req.query.id})
      res.json(true)
    }
    
  }
}
