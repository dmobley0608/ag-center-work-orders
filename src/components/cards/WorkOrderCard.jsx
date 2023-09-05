import React from 'react'
import { markWorkOrderFinalized, markWorkOrderIncomplete } from '../../api/api'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../api/AuthContext'

export default function WorkOrderCard({ setOrder, order, refreshOrders }) {
    const { status } = useParams()
    const nav = useNavigate()
    const { user } = useAuth()
    const markIncomplete = async (id) => {
        await markWorkOrderIncomplete(id)
            .then(res => {
                if (res.status === 200) {
                    refreshOrders()
                } else {
                    nav("/login")
                }
            }).catch(err => { nav('/login') })
    }

    const markFinalized = async (id) => {
        await markWorkOrderFinalized(id)
            .then(res => {

                if (res.status === 200) {
                    refreshOrders()
                } else {
                    nav("/login")
                }
            }).catch(err => { nav('/login') })

    }

    const printAssigntedTo = () => {
        let employees = ""
        for (let emp of order.assignedTo) {
            if (emp !== order.assignedTo[order.assignedTo.length - 1]) {
                employees += `${emp.employee.toUpperCase()}, `
            } else {
                employees += emp.employee.toUpperCase()
            }
        }
        return employees
    }

    return (
        <div className="card my-2 w-sm-100 w-lg-50 text-start">
            <div className='d-flex w-100'>
                <div className='d-flex w-50 p-2 comment-container'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chat-left" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    </svg>
                    <p className='comment-count'>{order.comments.length}</p>
                </div>
                {user &&
                    <div className='d-flex w-100 p-2'>
                        <svg onClick={() => { setOrder({ ...order, assignedTo: order.assignedTo.map(obj => obj.employee) }) }} data-bs-toggle="modal" data-bs-target="#exampleModal" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-pencil-square ms-auto" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg>
                    </div>
                }

            </div>

            {order.image && <img src="..." className="card-img-top" alt="..." />}
            <div className="card-body">
                <h3 className={`card-title p-1 rounded m-0
                ${order.priority === 3 ? "bg-danger" : ""}
                ${order.priority === 2 ? "bg-warning" : ""}
                ${order.priority === 1 ? "bg-info" : ""} `}>
                    {order.priority === 3 && "Needs To Be Finished ASAP"}
                    {order.priority === 2 && "Needs To Be Finished Before The Next Show"}
                    {order.priority === 1 && "Low Priority"}
                </h3>
                <h5 className="">Requested On: {new Date(order.createdAt).toDateString()}</h5>
                <p className="card-text"><strong>Work Request:</strong> <br />{order.details}</p>
                {status === "completed" &&
                    <>
                        <h6>Completed On: {new Date(order.completedAt).toDateString()} at {new Date(order.completedAt).toLocaleTimeString()}</h6>
                        <h6>By: {order.completedBy}</h6>
                    </>
                }
                {!order.approved && status !== "completed" ?
                    <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setOrder({ ...order })}>Mark Completed</button>
                    :
                    <div className='d-flex w-100 justify-content-evenly'>
                        <button className='btn btn-danger' onClick={() => markIncomplete(order._id)}>Send Back</button>
                        <button className='btn btn-success' onClick={() => markFinalized(order._id)}>Finalize</button>
                    </div>
                }
                <p className='mt-3'>Assigned to: {printAssigntedTo()}</p>
                <p className='mt-3 mb-0'>created by: {order.createdBy}</p>                
                <p className='fs-7'>Ticket # : <a href={`/order/${order._id}`}>{order._id}</a></p>
            </div>


        </div >

    )
}
