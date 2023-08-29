const express = require('express');
const { getOrderByStatus, addWorkOrder, markOrderComplete, markOrderNotComplete, markOrderFinalized, getOrderById, addComment } = require('../controllers/workOrders');

const workOrderRouter = express();

workOrderRouter.get('/:status', getOrderByStatus)
workOrderRouter.get('/work-order/:id', getOrderById)
workOrderRouter.post('/', addWorkOrder)
workOrderRouter.put('/:id', markOrderComplete)
workOrderRouter.put('/decline/:id', markOrderNotComplete)
workOrderRouter.put('/finalized/:id', markOrderFinalized)
workOrderRouter.put('/add-comment/:id', addComment)
module.exports = workOrderRouter