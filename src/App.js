import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import WorkOrders from './pages/workOrders/WorkOrders';
import Root from './components/Root';
import WorkOrder from './pages/workOrders/WorkOrder';
import Login from './pages/user/Login';
import { useAuth } from './api/AuthContext';
import { useEffect } from 'react';
import Inventory from './pages/inventory/Inventory';



const router = createBrowserRouter(createRoutesFromElements(
 
    <Route path='/' element={<Root />} >
       <Route path="/inventory" element={<Inventory />} />
      <Route path="/" element={<WorkOrders />} />     
      <Route path='/:status' element={<WorkOrders />} />     
      <Route path="/order/:id" element={<WorkOrder />} />
      <Route path="/login" element={<Login />} />
    </Route>


))

function App() {
  const auth = useAuth()

  useEffect(()=>{auth.login()},[])
  return (
    <div className="App">
      {auth.isLoading ? <h1>Loading ...</h1>:  <RouterProvider router={router} />}
    </div>
  );
}

export default App;
