import {Schema, model} from 'mongoose'

export enum categoryDepo{
    AZ = 'Azerbaycan',
    TR = 'Turkiye'
}

const DepoSchema  = new Schema({
    category: {type: String, enum: categoryDepo, default: categoryDepo.TR},
    limit: Number,
    products: [{type: Schema.Types.ObjectId, ref: 'product'}]
})

export default model('depo', DepoSchema)