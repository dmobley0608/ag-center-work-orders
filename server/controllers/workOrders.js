const WorkOrder = require('../models/workOrderModel');
const { sendMessage } = require('../utils/emailService/email');


//Get Work Order By Status
exports.getOrderByStatus = async (req, res) => {
    const { status } = req.params
    const workOrders = status === "pending" ?
        await WorkOrder.find({ completed: false, finalized: false }).sort({priority:-1, createdAt: -1})
        : await WorkOrder.find({ completed: true, finalized: false }).sort({priority:-1, createdAt: -1})
    res.status(200).json(workOrders)
}
//Get Order By id
exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params
        const order = await WorkOrder.findById(id)
        res.status(200).json(order)
    } catch (err) {
        res.status(500).json(err)
    }

}
//Add Work Order
exports.addWorkOrder = async (req, res) => {
    
    try {
        const submittedOrder = { ...req.body }
        submittedOrder.assignedTo = req.body.assignedTo.map(emp => ({ employee: emp }))
        submittedOrder.createdBy = req.user.username
        const order = await WorkOrder.create(submittedOrder)
        sendMessage('A New Work Order Has Been Submitted', order)
        res.status(200).json("Work Order Added Successfully")

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

//Edit Work Order
exports.editOrder = async(req,res)=>{
   
    try {
        const {id} = req.params
        const submittedOrder = req.body 
        submittedOrder.assignedTo = req.body.assignedTo.map(emp => ({ employee: emp }))        
        const order = await WorkOrder.findById(id)
        await order.updateOne({...submittedOrder})
        sendMessage('A Work Order Has Been Updated', order)
        res.status(200).json("Work Order Updated Successfully")

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
//Mark Completed
exports.markOrderComplete = async (req, res) => {
    try {
        const order = await WorkOrder.findById(req.params.id)
        if (order) {
            await order.updateOne({ completed: true, completedAt: Date.now(), completedBy: req.body.completedBy })
            res.status(200).json("Updated Order")
        } else {
            res.status(404).json("Order Not Found")
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

//Decline Finish Order
exports.markOrderNotComplete = async (req, res) => {
    try {
        const order = await WorkOrder.findById(req.params.id)
        if (order) {
            await order.updateOne({ completed: false, completedAt: null, completedBy: null })
            sendMessage(`Please take another look at the following work request`, order)
            res.status(200).json("Updated Order")
        } else {
            res.status(404).json("Order Not Found")
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
//Add Comment To Order
exports.addComment = async (req, res) => {
    try {
        const { id } = req.params
        const order = await WorkOrder.findById(id)        
        if (order) {
            order.comments.push({ body: req.body.comment })           
            await order.save()    
            console.log('sending message')
            sendMessage('There is a new comment for the following work order', order)        
            res.status(200).json("Added Comment")
        } else {
            res.status(404).json("Order Not Found")
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

//Finalize Order
exports.markOrderFinalized = async (req, res) => {
    try {
        const order = await WorkOrder.findById(req.params.id)
        if (order) {
            await order.updateOne({ finalized: true })
            res.status(200).json("Updated Order")
        } else {
            res.status(404).json("Order Not Found")
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

