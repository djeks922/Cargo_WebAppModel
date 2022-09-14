import {Schema, model, Mongoose} from 'mongoose'


const FlightSchema  = new Schema({
    flight_number: String,
    flight_date: Date,
    landing_date: Date,
    weight_limit: String,
    isUnload: {type: Boolean, default: false},
    products: [{type: Schema.Types.ObjectId, ref: 'product'}]
})

export default model('flight', FlightSchema)