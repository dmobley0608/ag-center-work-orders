import React from 'react'
import { markWorkOrderComplete, markWorkOrderFinalized, markWorkOrderIncomplete } from '../../api'
import { useParams } from 'react-router-dom'

export default function WorkOrderCard({ setOrder, order, refreshOrders }) {
    const { status } = useParams()


    const markIncomplete = async (id) => {
        const res = await markWorkOrderIncomplete(id)
        refreshOrders()
    }

    const markFinalized = async (id) => {
        const res = await markWorkOrderFinalized(id)
        refreshOrders()
    }
    return (
        <div className="card my-2 w-sm-100 w-lg-50 text-start">
            
            {order.image && <img src="..." className="card-img-top" alt="..." />}
            <div className="card-body">
                <h5 className="card-title">Requested On: {new Date(order.createdAt).toDateString()}</h5>
                <p className="card-text"><strong>Work Request:</strong> <br/>{order.details}</p>
                {status === "completed" &&
                    <>
                        <h6>Completed On: {new Date(order.completedAt).toDateString()} at {new Date(order.completedAt).toLocaleTimeString()}</h6>
                        <h6>By: {order.completedBy}</h6>
                    </>
                }
                {!order.approved && status !== "completed" ?
                    <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setOrder(order)}>Mark Completed</button>
                    :
                    <div className='d-flex w-100 justify-content-evenly'>
                        <button className='btn btn-danger' onClick={() => markIncomplete(order._id)}>Send Back</button>
                        <button className='btn btn-success' onClick={() => markFinalized(order._id)}>Finalize</button>
                    </div>

                }
                <p className='mt-5 mb-0'>created by: {order.createdBy}</p>      
                <p className='fs-7'>Ticket # : <a href={`/order/${order._id}`}>{order._id}</a></p>         
            </div>
        </div>
    )
}
