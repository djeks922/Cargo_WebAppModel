import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { categoryDepo } from "../model/depo.model";
import flightModel from "../model/flight.model";
import productModel from "../model/product.model";
import depoService from "../service/depo.service";

export const createFlight = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const fligthInput = req.body;
    fligthInput.flight_date = new Date(fligthInput.flight_date);
    fligthInput.landing_date = new Date(fligthInput.landing_date);

    const fligthDoc = await flightModel.create(fligthInput);
    res.send({ data: fligthDoc });
  } catch (error) {
    next(error);
  }
};
export const getFlight = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const flight = await flightModel.findById(id);
    if (!flight) return res.send({ data: null });
    res.send({ data: flight });
  } catch (error) {
    next(error);
  }
};
export const getFlights = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const flights = await flightModel.find({});
    res.send({ data: flights });
  } catch (error) {
    next(error);
  }
};
export const deleteFlight = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const deleted = await flightModel.deleteOne({ _id: id });
    if (!deleted.deletedCount)
      return res.send({ data: "Operation unsuccesfull!" });
    res.send({ data: "Succesfully deleted" });
  } catch (error) {
    next(error);
  }
};

export const addProductToFlight = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await mongoose.connection.startSession();
  session.startTransaction();
  try {
    const {
      flightID,
      productID,
    }: {
      flightID: mongoose.Types.ObjectId;
      productID: mongoose.Types.ObjectId;
    } = req.params as unknown as any;

    await depoService.removeProduct(productID, categoryDepo.TR, session);

    const result = await flightModel.updateOne(
      { _id: flightID },
      { $addToSet: { products: productID } },
      { session }
    );
    if (!result.matchedCount) {
      throw new Error("Flight not founded");
    } else if (!result.modifiedCount) {
      throw new Error("Product could not be added!");
    }
    await session.commitTransaction();
    res.send({
      data: `Product with ID: ${productID} added to the flight with ID: ${flightID}`,
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }
};

export const unloadFlight = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {flightID, depoID} = req.params

    const flight = await flightModel.findById(flightID)

    if(!flight) throw new Error("Flight not founded!");

    if(flight.isUnload) {
      const error =  new Error("Products already unloaded to depo!");
      (error as any).status = 409
      throw error
    }
      
    
    
    const flightProducts: mongoose.Types.ObjectId[] = flight.products as unknown as mongoose.Types.ObjectId[]
  
    const result = await depoService.addProducts(flightProducts,depoID as categoryDepo | mongoose.Types.ObjectId)

    flight.isUnload = true
    await flight.save()

    res.send({data: result})
  } catch (error) {
    next(error)
  }
};
