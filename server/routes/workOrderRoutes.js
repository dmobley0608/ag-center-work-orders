const express = require('express');
const { getOrderByStatus, addWorkOrder, markOrderComplete, markOrderNotComplete, markOrderFinalized, getOrderById, addComment } = require('../controllers/workOrders');
const { checkUser } = require('../utils/auth');


const workOrderRouter = express.Router();




workOrderRouter.get('/:status', getOrderByStatus)
workOrderRouter.get('/work-order/:id', getOrderById)
workOrderRouter.post('/',checkUser, addWorkOrder)
workOrderRouter.put('/:id', markOrderComplete)
workOrderRouter.put('/decline/:id',checkUser, markOrderNotComplete)
workOrderRouter.put('/finalized/:id', checkUser,markOrderFinalized)
workOrderRouter.put('/add-comment/:id', addComment)

module.exports = workOrderRouter