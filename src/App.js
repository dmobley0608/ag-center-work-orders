import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import WorkOrders from './pages/workOrders/WorkOrders';
import Root from './components/Root';
import WorkOrder from './pages/workOrders/WorkOrder';


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root/>} >   
    <Route path="/" element={<WorkOrders/>}/>
    <Route path='/:status' element={<WorkOrders />}/>
    <Route path="/order/:id" element={<WorkOrder/>}/>
  </Route>
))

function App() {





  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
