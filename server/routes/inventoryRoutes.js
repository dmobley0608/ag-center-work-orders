const express = require('express');
const { getInventoryItems, getItemById, editItem } = require('../controllers/inventoryController');



const workOrderRouter = express();


workOrderRouter.get('/',getInventoryItems)
workOrderRouter.get('/:id', getItemById)
workOrderRouter.put('/:id', editItem)


module.exports = workOrderRouter