import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { addCommentToWorkOrder, getWorkOrderById } from '../../api/api'
import { PlusSquareFill } from 'react-bootstrap-icons'
import CommentModal from '../../components/modals/CommentsModal'
import WorkFormModal from '../../components/modals/WorkFormModal'
export default function WorkOrder() {
    const { id } = useParams()
    const [order, setOrder] = useState({})
    const [comment, setComment] = useState("")   
    const getOrderById = async () => {
        const res = await getWorkOrderById(id)
        if (res.status === 200) {
            setOrder({ ...res.data })          
        }
    }
    const handleSubmit = async () => {
        await addCommentToWorkOrder(id, { comment })
        await getOrderById(id)
        setComment("")
    }
    useEffect(() => {
        getOrderById()
    }, [id])
    return (
        <div className='text-start p-3'>
            <NavLink className='btn btn-secondary mb-2' to="/pending" >Home</NavLink>
             <h3 className={`card-title p-1 rounded m-0
                ${order.priority === 3 ? "bg-danger":""}
                ${order.priority === 2 ? "bg-warning":""}
                ${order.priority === 1 ? "bg-info":""} `}>
                    {order.priority === 3 && "Needs To Be Finished ASAP"}
                    {order.priority === 2 && "Needs To Be Finished Before The Next Show"}
                    {order.priority === 1 && "Low Priority"}
                    </h3>
            <h1>{order._id}</h1>            
            <h5>Request:</h5>
            <p>{order.details}</p>
            <hr />
            <h6>Created By: {order.createdBy}</h6>
            <h6>Created On: {new Date(order.createdAt).toDateString()}</h6>
            <hr />
            {order.completedAt?
                <>
                    <h6>Completed By: {order.completedBy}</h6>
                    <h6>Completed On: {new Date(order.completedAt).toDateString()}</h6>
                    <h6>Completed At: {new Date(order.completedAt).toLocaleTimeString()}</h6>
                   
                </>
                :
                <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setOrder({...order})}>Mark Completed</button>
            }
             <hr />
            <h3>Comments <PlusSquareFill data-bs-toggle="modal" data-bs-target="#commentModal" /> </h3>
            {order.comments && order.comments.map(comment => (
                <div className='card my-1 px-2'>
                    <p className='card-body'>{comment.body}</p>
                    <div className='flex'>
                        <p>{`${new Date(comment.date).toDateString()} @
                         ${new Date(comment.date).toLocaleTimeString()}`}</p>
                    </div>

                </div>
            ))}
            <CommentModal order={order} setComment={setComment} handleSubmit={handleSubmit} />
            <WorkFormModal order={order} setOrder={setOrder}/>
        </div>
    )
}
