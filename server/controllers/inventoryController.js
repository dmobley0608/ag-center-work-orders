const Inventory = require('../models/inventoryModel');
const WorkOrder = require('../models/workOrderModel');
const { sendMessage, sendInventoryMessage } = require('../utils/emailService/email');


//Get All Inventory Items
exports.getInventoryItems = async (req, res) => {
    const items = await Inventory.find()
    res.status(200).json(items)
}
//Get Item By id
exports.getItemById = async (req, res) => {
    try {
        const { id } = req.params
        const item = await Inventory.findById(id)
        res.status(200).json(item)
    } catch (err) {
        res.status(500).json(err)
    }

}
//Add Item
exports.addItem = async (req, res) => {

    try {
        const item = await Inventory.create({ ...req.body })
        res.status(200).json({ message: "Item Added Successfully", item })

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

//Edit Item
exports.editItem = async (req, res) => {
    try {

        const { id } = req.params        
        const item = await Inventory.findById(id)      
        if (item) {
            await item.updateOne({ ...req.body })
            if (item.quantity < 2) sendInventoryMessage('We need to order more ', item)
        }

        res.status(200).json("Item Updated Successfully")

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
