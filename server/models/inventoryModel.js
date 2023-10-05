const { Schema, model } = require("mongoose");

const schema = new Schema({
    title:String,
    barcode:String,
    quantity:Number
})

const Inventory = model('Inventory', schema)

module.exports = Inventory
