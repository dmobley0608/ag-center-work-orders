import React from 'react'
import { useAuth } from '../../api/AuthContext'
import { useNavigate, useParams } from 'react-router-dom';
import { addWorkOrder, editWorkOrder, markWorkOrderComplete } from '../../api/api';
import { Field, Form, Formik } from 'formik';

export default function WorkFormModal({ setOrder, order }) {
  const { user, setIsLoading } = useAuth(); 
  const nav = useNavigate()

  //Handle Work Order Submit
  const handleSubmit = async (values) => {   
    values._id = null
    setIsLoading(true)
    console.log(values)
    // Check to see if order already exists
    if (order.__id) {
      await editWorkOrder(order._id, values)
        .then(res => {
          if (res.status === 200) {
            nav('/pending')
            setOrder({})
          } else {
            nav("/login")
          }
        }).catch(err => { nav('/login') })
      //Create a new order        
    } else {      
      
      await addWorkOrder(values)
        .then(res => {
          if (res.status === 200) {
            nav('/pending')
            setOrder({})
          } else {
            nav("/login")
          }
        }).catch(err => { setIsLoading(false); alert(err) })
    }
    setIsLoading(false)
  }


  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Work Order</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          {/* Form */}
          <Formik initialValues={{ ...order }} onSubmit={handleSubmit} enableReinitialize={true}>
            {()=>(
          
            <Form className="modal-body" >
              {user &&
                <>
                  <div className="mb-3">
                    <label htmlFor="details" className="form-label">Order Details</label>
                    <Field as="textarea" name="details" className="form-control" id="details" ></Field>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="priority" className="form-label">Priority</label>
                    <Field as='select' className="form-control" name='priority' id="priority" >
                      <option value={""} >Please Select An Option</option>
                      <option value={1}>Low Priority</option>
                      <option value={2}>Needs To Be Finished Before The Next Show</option>
                      <option value={3}>Needs To Be Finished ASAP</option>
                    </Field>
                  </div>
                  <div className="mb-3" >
                    <h4 className="form-label" >Assign To</h4>
                    <div className='d-flex flex-column justify-content-start align-items-start flex-wrap mx-auto' style={{ maxHeight: '100px', width: '200px' }}>
                      <div className="form-check" style={{ maxWidth: '100px' }}>
                        <Field className="form-check-input" type="checkbox" name='assignedTo' value="adam" />
                        <label className="form-check-label" htmlFor="flexCheckChecked">
                          Adam
                        </label>
                      </div>
                      <div className="form-check" style={{ maxWidth: '100px' }}>
                        <Field className="form-check-input" type="checkbox" name='assignedTo' value="kiser" />
                        <label className="form-check-label" htmlFor="flexCheckChecked">
                          Kieser
                        </label>
                      </div>
                      <div className="form-check" style={{ maxWidth: '100px' }}>
                        <Field className="form-check-input" type="checkbox" name='assignedTo' value="peyton" />
                        <label className="form-check-label" htmlFor="flexCheckChecked">
                          Peyton
                        </label>
                      </div>
                      <div className="form-check" style={{ maxWidth: '100px' }}>
                        <Field className="form-check-input " type="checkbox" name='assignedTo' value="dwight" />
                        <label className="form-check-label" htmlFor="flexCheckChecked">
                          Dwight
                        </label>
                      </div>
                      <div className="form-check" style={{ maxWidth: '100px' }}>
                        <Field className="form-check-input" type="checkbox" name='assignedTo' value="khip" />
                        <label className="form-check-label" htmlFor="flexCheckChecked">
                          Khip
                        </label>
                      </div>
                    </div>


                  </div>
                </>
              }

              {order.createdAt &&
                <div className="mb-3">
                  <label htmlFor="completedBy" className="form-label">Completed By</label>
                  <Field as="select" className="form-control" name="completedBy" id="completedBy">
                    <option value="" >Please Select An Option</option>
                    <option value="K. Miller">Khip</option>
                    <option value={"D. Mobley"}>Dwight</option>
                    <option value={"A. Sanders"}>Adam</option>
                    <option value={"K. Roberts"}>Kiser</option>
                    <option value={"P. Black"}>Peyton</option>
                  </Field>
                </div>
              }
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <input type="submit" className="btn btn-primary" data-bs-dismiss="modal" value="Submit" />
              </div>
            </Form>
            )}
          </Formik>

        </div>
      </div>
    </div>

  )
}
