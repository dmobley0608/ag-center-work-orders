import React from 'react'
import { useAuth } from '../../api/AuthContext'
import { useNavigate } from 'react-router-dom';
import { markWorkOrderComplete } from '../../api/api';
import { Field, Form, Formik } from 'formik';

export default function WorkFormMarkCompletedModal({ order }) {
  const { setIsLoading } = useAuth();   

  //Handle Work Order Submit
  const handleSubmit = async (values) => {       
    setIsLoading(true)   
    await markWorkOrderComplete(order._id, order)
    setIsLoading(false)
  }


  return (
    <div className="modal fade" id="markCompleteModal" tabIndex="-1" aria-labelledby="markCompleteModal" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="markCompleteModalLabel">Work Order</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          {/* Form */}
          <Formik initialValues={{ ...order }} onSubmit={handleSubmit} enableReinitialize={true}>
            {()=>(
          
            <Form className="modal-body" >           
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
