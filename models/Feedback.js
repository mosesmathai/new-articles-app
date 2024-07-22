import mongoose, {Schema} from "mongoose";

const feedbackSchema = new Schema(
  {
    userName: String,
    message: String,
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);

export default Feedback;