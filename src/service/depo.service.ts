import { NextFunction, Request, Response } from "express";
import mongoose, { ClientSession } from "mongoose";
import depoModel from "../model/depo.model";
import Depo, { categoryDepo } from "../model/depo.model";
import productModel, { ProductStatusEnum } from "../model/product.model";
import isCategoryOrId from "../utils/isCategoryOrId";

export const createDepo = async (depo: any) => {
  try {
    const _depo = await Depo.create(depo);

    return _depo;
  } catch (error) {
    throw error;
  }
};
export const getDepo = async ({
  id = undefined,
  category = undefined,
}: {
  id?: string | undefined;
  category?: categoryDepo | undefined;
}) => {
  try {
    const queryParam = id ? { _id: id } : category ? { category } : null;
    if (!queryParam) throw new Error("Bad request");

    const depo = await Depo.findOne(queryParam).populate('products');

    return depo;
  } catch (error) {
    throw error;
  }
};
export const getDepos = async () => {
  try {
    const depos = await Depo.find({}).populate('products').lean();
    return depos;
  } catch (error) {
    throw error;
  }
};

export const getDepoLimit = async (category: categoryDepo) => {
  try {
    const limit = await Depo.findOne({ category }, "limit").lean();
    return limit;
  } catch (error) {
    throw error;
  }
};
export const deleteDepo = async (id: string) => {
  try {
    const deleted = await Depo.deleteOne({ _id: id });
    if (!deleted.deletedCount) throw new Error("Operation unsuccesfull");
    return "Succesfully deleted";
  } catch (error) {
    throw error;
  }
};

export const addProduct = async (
  id: mongoose.Types.ObjectId,
  category: categoryDepo | mongoose.Types.ObjectId
) => {
  try {
    let query: any = isCategoryOrId(category);

    const updatedInfo = await Depo.updateOne(query, {
      $addToSet: { products: id },
    });
    if (!updatedInfo.matchedCount) {
      throw new Error("Depo not founded");
    } else if (!updatedInfo.modifiedCount) {
      throw new Error("Product already in Depo");
    }
    const depoInfo = await getDepo({ category: categoryDepo.TR });
    if (depoInfo?.products?.length! >= depoInfo?.limit!) {
      return "Successfully added to Depo , DEPO LIMIT IS RICHED. PLEASE CONSIDER IT";
    }

    return "Successfully added to Depo";
  } catch (error) {
    throw error;
  }
};

const addProducts = async (
  productIDs: mongoose.Types.ObjectId[],
  category: categoryDepo | mongoose.Types.ObjectId
) => {
  try {
    let query = isCategoryOrId(category);

    const result = await depoModel.updateOne(query, {
      $push: { products: productIDs },
    });
    const productResult = await productModel.updateMany({_id: {$in:productIDs}},{status: ProductStatusEnum.inDepoAZ})

    if (!result.modifiedCount) throw new Error("Operation unsuccessfull!");
    return "Successfully added products to Depo!";
  } catch (error) {
    throw error;
  }
};

export const removeProduct = async (
  _id: mongoose.Types.ObjectId,
  category: categoryDepo | mongoose.Types.ObjectId,
  session?: ClientSession
) => {
  try {
    let query = isCategoryOrId(category);

    let session1;
    if (session) session1 = { session };
    const deletedInfo = await Depo.updateOne(
      query,
      { $pull: { products: _id }, $addToSet: { products_archive: _id } },
      session1
    );

    if (!deletedInfo.matchedCount) {
      throw new Error("Depo not founded");
    } else if (!deletedInfo.modifiedCount) {
      throw new Error("Product not in the depo");
    }
    return "Successfully removed";
  } catch (error) {
    throw error;
  }
};

export default {
  createDepo,
  getDepo,
  getDepos,
  deleteDepo,
  addProduct,
  removeProduct,
  addProducts,
  getDepoLimit,
};
