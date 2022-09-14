import mongoose from "mongoose";
import { categoryDepo } from "../model/depo.model";

export default (category: mongoose.Types.ObjectId | categoryDepo) => {
    let query: any;
    if (mongoose.isValidObjectId(category)) {
      query = { _id: category };
    } else {
      query = { category };
    }
    return query
}