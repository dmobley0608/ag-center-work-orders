import React, { useEffect, useState } from 'react'
import { addWorkOrder, getWorkOrders, markWorkOrderComplete } from '../../api/api'
import WorkOrderCard from '../../components/cards/WorkOrderCard'
import WorkFormModal from '../../components/modals/WorkFormModal'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../api/AuthContext'

export default function WorkOrders() {
    const [workOrders, setWorkOrders] = useState([])
    const [order, setOrder] = useState({ assignedTo: [] })
    const { status } = useParams()
    const nav = useNavigate()
    const { user, isLoading, setIsLoading } = useAuth()

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

    //Handle Work Order Submit
    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault()

        //Check to see if order already exists
        if (order.createdAt) {
            await markWorkOrderComplete(order._id, order)
                .then(res => {
                    if (res.status === 200) {
                        fetchWorkOrders()
                        setOrder({})
                    } else {
                        nav("/login")
                    }
                }).catch(err => { nav('/login') })
            //Create a new order        
        } else {
            //Check form checkboxes and assign values to Order
            const { assignedTo } = e.target
            for (let checkBox of assignedTo) {
                if (checkBox.checked) {
                    order.assignedTo.push(checkBox.value)
                }
            }
            await addWorkOrder(order)
                .then(res => {
                    if (res.status === 200) {
                        fetchWorkOrders()
                        setOrder({})
                    } else {
                        nav("/login")
                    }
                }).catch(err => { setIsLoading(false); alert(err) })


        }
        setIsLoading(false)
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
                handleSubmit={handleSubmit}
                status={status}
            />
        </div>
    )
}
