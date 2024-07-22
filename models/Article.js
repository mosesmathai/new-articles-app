import mongoose, {Schema} from "mongoose";

const articleSchema = new Schema(
  {
    title: String,
    message: String,
    author: String,
    images: [{type: String}],
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.models.Article || mongoose.model("Article", articleSchema);

export default Article;