import axios from "axios";

const client = axios.create({
    baseURL:"http://localhost:9000/api/"
})

export const getWorkOrders = (status) => client.get(`work-orders/${status}`)
export const getWorkOrderById = (id) => client.get(`work-orders/work-order/${id}`)
export const addWorkOrder = (order)=> client.post("work-orders", order)
export const markWorkOrderComplete = (id, order)=> client.put( `work-orders/${id}`, order)
export const markWorkOrderIncomplete = (id, order)=> client.put( `work-orders/decline/${id}`, order)
export const markWorkOrderFinalized = (id)=> client.put( `work-orders/finalized/${id}`)
export const addCommentToWorkOrder = (id, comment)=>client.put(`/work-orders/add-comment/${id}`, comment)