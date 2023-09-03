import React from 'react'
import { useAuth } from '../../api/AuthContext'

export default function WorkFormModal({ setOrder, order, handleSubmit }) {
  const auth = useAuth();
  
  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Work Order</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          {/* Form */}
          <form className="modal-body" onSubmit={(e) => handleSubmit(e)} method='post'>
            {auth.user && !order.createdAt &&
              <>
                <div className="mb-3">
                  <label htmlFor="details" className="form-label">Order Details</label>
                  <textarea type="details" className="form-control" id="details"
                    onChange={(e) => setOrder({ ...order, details: e.target.value })} value={order.details ? order.details : ""}></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="priority" className="form-label">Priority</label>
                  <select className="form-control" id="priority" defaultValue={1} onChange={(e) => setOrder({ ...order, priority: e.target.value })} value={order.priority}>
                    <option >Please Select An Option</option>
                    <option value={1}>Low Priority</option>
                    <option value={2}>Needs To Be Finished Before The Next Show</option>
                    <option value={3}>Needs To Be Finished ASAP</option>
                  </select>
                </div>
                <div className="mb-3" >
                  <h4 className="form-label" >Assign To</h4>
                  <div className='d-flex flex-column justify-content-start align-items-start flex-wrap mx-auto' style={{ maxHeight: '100px', width: '200px' }}>
                    <div className="form-check" style={{ maxWidth: '100px' }}>
                      <input className="form-check-input" type="checkbox" name='assignedTo' value="adam" id="flexCheckChecked" />
                      <label className="form-check-label" for="flexCheckChecked">
                        Adam
                      </label>
                    </div>
                    <div className="form-check" style={{ maxWidth: '100px' }}>
                      <input className="form-check-input" type="checkbox" name='assignedTo' value="kiser" id="flexCheckChecked" />
                      <label className="form-check-label" for="flexCheckChecked">
                        Kieser
                      </label>
                    </div>
                    <div className="form-check" style={{ maxWidth: '100px' }}>
                      <input className="form-check-input" type="checkbox" name='assignedTo' value="peyton" id="flexCheckChecked" />
                      <label className="form-check-label" for="flexCheckChecked">
                        Peyton
                      </label>
                    </div>
                    <div className="form-check" style={{ maxWidth: '100px' }}>
                      <input className="form-check-input " type="checkbox" name='assignedTo' value="dwight" id="flexCheckChecked" />
                      <label className="form-check-label" for="flexCheckChecked">
                        Dwight
                      </label>
                    </div>
                    <div className="form-check" style={{ maxWidth: '100px' }}>
                      <input className="form-check-input" type="checkbox" name='assignedTo' value="khip" id="flexCheckChecked" />
                      <label className="form-check-label" for="flexCheckChecked">
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
                <select className="form-control" id="completedBy" defaultValue={-1} onChange={(e) => setOrder({ ...order, completedBy: e.target.value })} value={order.completedBy}>
                  <option >Please Select An Option</option>
                  <option value={"K. Miller"}>Khip</option>
                  <option value={"D. Mobley"}>Dwight</option>
                  <option value={"A. Sanders"}>Adam</option>
                  <option value={"K. Roberts"}>Kiser</option>
                  <option value={"P. Black"}>Peyton</option>
                </select>
              </div>
            }
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <input type="submit" className="btn btn-primary" data-bs-dismiss="modal" value="Submit" />
            </div>
          </form>

        </div>
      </div>
    </div>

  )
}
