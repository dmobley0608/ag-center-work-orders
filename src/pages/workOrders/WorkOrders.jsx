import React, { useEffect, useState } from 'react'
import { addWorkOrder, getWorkOrders, markWorkOrderComplete } from '../../api'
import WorkOrderCard from '../../components/cards/WorkOrderCard'
import WorkFormModal from '../../components/modals/WorkFormModal'
import { useParams } from 'react-router-dom'

export default function WorkOrders() {
    const [workOrders, setWorkOrders] = useState([])
    const [order, setOrder] = useState({}) 
    const { status } = useParams() 

    //Get Current Work Orders
    const fetchWorkOrders = async () => {
        let filter = status
        setWorkOrders([])
        if(!status){
            filter="pending"
        }
        const res = await getWorkOrders(filter)
        setWorkOrders(res.data)
        return res.data
    }

    //Handle Work Order Submit
    const handleSubmit = async () => {
        if(order.createdAt){
            await markWorkOrderComplete(order._id, order)
            fetchWorkOrders()
            setOrder({})
        }else{
        const res = await addWorkOrder(order)
        if (res.status === 200) {
            fetchWorkOrders(false)
            setOrder({})
        } else {
            alert("Error adding Order")
        }
    }
    }

    //Update Page on load
    useEffect(() => {
        fetchWorkOrders()
    }, [status])


    return (
        <div className='container'>
            <button type="button" className="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                
                Create New Work Order
            </button>
            <h1>{status === "pending"? "Pending Work Orders" : "Completed Work Orders"}</h1>
            {workOrders.map(order => <WorkOrderCard key={order._id} setOrder={setOrder} order={order} refreshOrders={fetchWorkOrders} completedOrders={false} />)}
            <WorkFormModal
               order={order}
               setOrder={setOrder}
                handleSubmit={handleSubmit}
                status={status}
            />
        </div>
    )
}
