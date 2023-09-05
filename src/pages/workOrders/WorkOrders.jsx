import React, { useEffect, useState } from 'react'
import { getWorkOrders} from '../../api/api'
import WorkOrderCard from '../../components/cards/WorkOrderCard'
import WorkFormModal from '../../components/modals/WorkFormModal'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../api/AuthContext'

export default function WorkOrders() {
    const [workOrders, setWorkOrders] = useState([])
    const [order, setOrder] = useState({})
    const { status } = useParams()    
    const { user } = useAuth()

    //Get Current Work Orders
    const fetchWorkOrders = async () => {
        let filter = status
        setWorkOrders([])
        if (!status) {
            filter = "pending"
        }
        const res = await getWorkOrders(filter)        
        setWorkOrders(res.data)
        return res.data
    }

   

    //Update Page on load
    useEffect(() => {
        fetchWorkOrders()
    }, [status])


    return (
        <div className='container'>
            {user && <button type="button" className="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Create New Work Order
            </button>
            }
            <h1>{status === "completed" ? "Completed Work Orders" : "Pending Work Orders"}</h1>
            {workOrders.map(order => <WorkOrderCard key={order._id} setOrder={setOrder} order={order} refreshOrders={fetchWorkOrders} completedOrders={false} />)}
            <WorkFormModal
                order={order}
                setOrder={setOrder}                
                status={status}
            />
        </div>
    )
}
