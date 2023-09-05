import axios from "axios";
const url = process.env.REACT_APP_PRODUCTION !== true ?"http://localhost:9000/api/":"/api/"
const client = axios.create({
    baseURL:"/api/"
})

export const getWorkOrders = (status) => client.get(`work-orders/${status}`)
export const getWorkOrderById = (id) => client.get(`work-orders/work-order/${id}`)
export const addWorkOrder = (order)=> client.post("work-orders", order)
export const editWorkOrder = (id, order) => client.put(`work-orders/edit/${id}`, order)
export const markWorkOrderComplete = (id, order)=> client.put( `work-orders/${id}`, order)
export const markWorkOrderIncomplete = (id, order)=> client.put( `work-orders/decline/${id}`, order)
export const markWorkOrderFinalized = (id)=> client.put( `work-orders/finalized/${id}`)
export const addCommentToWorkOrder = (id, comment)=>client.put(`/work-orders/add-comment/${id}`, comment)
export const login = (user) =>client.post('/user/login', user)
export const logoutSession = () => client.post('user/logout')
export const verifyLoggedIn = () => client.get('/user/verify-user')