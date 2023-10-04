import React, { useEffect, useState,useCallback } from "react";
import { getWorkOrders } from "../../api/api";
import WorkOrderCard from "../../components/cards/WorkOrderCard";
import WorkFormModal from "../../components/modals/WorkFormModal";
import { useParams } from "react-router-dom";
import { useAuth } from "../../api/AuthContext";
import useWebSocket, { ReadyState } from "react-use-websocket";


export default function WorkOrders() {
  const [workOrders, setWorkOrders] = useState([]);
  const [order, setOrder] = useState({});
  const { status } = useParams();
  const { user } = useAuth();

  const [socketUrl, setSocketUrl] = useState("ws://localhost:9000/ws");
  const [messageHistory, setMessageHistory] = useState("{}");

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

//   //Get Current Work Orders
//   const fetchWorkOrders = async () => {
//     let filter = status;
//     setWorkOrders([]);
//     if (!status) {
//       filter = "pending";
//     }
//     const res = await getWorkOrders(filter);
//     setWorkOrders(res.data);
//     return res.data;
//   };

  useEffect(() => { 
  
  
 
    if (lastMessage !== null) {
        const orders = JSON.parse(lastMessage)
        console.log(orders)
        setWorkOrders(orders)
      
    }
  }, [lastMessage]);

  const handleClickChangeSocketUrl = useCallback(
    () => setSocketUrl("wss://demos.kaazing.com/echo"),
    []
  );

  const handleClickSendMessage = useCallback(() => sendMessage("Hello"), []);
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  //Update Page on load
  useEffect(() => {
    // fetchWorkOrders();
  }, [status]);

  return (
    <div className="container">
      <button onClick={handleClickChangeSocketUrl}>
        Click Me to change Socket Url
      </button>
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}>
        Click Me to send 'Hello'
      </button>

      {user && (
        <button
          type="button"
          className="btn btn-primary mt-3"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal">
          Create New Work Order
        </button>
      )}

      <h1>
        {status === "completed"
          ? "Completed Work Orders"
          : "Pending Work Orders"}
      </h1>
      
      {workOrders.map((order) => (
        <WorkOrderCard
          key={order._id}
          setOrder={setOrder}
          order={order}
          refreshOrders={()=>{}}
          completedOrders={false}
        />
      ))}
      <WorkFormModal order={order} setOrder={setOrder} status={status} />
    </div>
  );
}
