import React from 'react'
import { markWorkOrderFinalized, markWorkOrderIncomplete } from '../../api/api'
import { useNavigate, useParams } from 'react-router-dom'


export default function WorkOrderCard({ setOrder, order, refreshOrders }) {
    const { status } = useParams()   
    const nav = useNavigate()

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

    const printAssigntedTo=()=>{
        let employees = ""
        for(let emp of order.assignedTo){          
            if(emp !== order.assignedTo[order.assignedTo.length -1]){
                employees += `${emp.employee.toUpperCase()}, `
            }else{
                employees += emp.employee.toUpperCase()
            }
            return employees
        }
    }
   
    return (       
        <div className="card my-2 w-sm-100 w-lg-50 text-start">
            
                { order.image && <img src="..." className="card-img-top" alt="..." /> }
                < div div className="card-body">
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
                <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setOrder({...order})}>Mark Completed</button>
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
