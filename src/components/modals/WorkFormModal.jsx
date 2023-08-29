import React from 'react'

export default function WorkFormModal({ setOrder, order, handleSubmit }) {
  return (

    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Work Order</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="details" className="form-label">Order Details</label>
              <textarea type="details" className="form-control" id="details"
                onChange={(e) => setOrder({ ...order, details: e.target.value })} value={order.details ? order.details : ""}></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="priority" className="form-label">Priority</label>
              <select className="form-control" id="priority" onChange={(e) => setOrder({ ...order, priority: e.target.value })} value={order.priority}>
                <option selected>Please Select An Option</option>
                <option value={1}>Low Priority</option>
                <option value={2}>Needs To Be Finished Before The Next Show</option>
                <option value={3}>Needs To Be Finished ASAP</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="createdBy" className="form-label">Submitted By</label>
              <select className="form-control" id="createdBy" onChange={(e) => setOrder({ ...order, createdBy: e.target.value })} value={order.createdBy}>
                <option selected>Please Select An Option</option>
                <option value={"K. Miller"}>Khip</option>
                <option value={"D. Mobley"}>Dwight</option>
              </select>
            </div>
            {order.createdAt &&
              <div className="mb-3">
                <label htmlFor="completedBy" className="form-label">Completed By</label>
                <select className="form-control" id="completedBy" onChange={(e) => setOrder({ ...order, completedBy: e.target.value })} value={order.completedBy}>
                  <option selected>Please Select An Option</option>
                  <option value={"K. Miller"}>Khip</option>
                  <option value={"D. Mobley"}>Dwight</option>
                  <option value={"A. Sanders"}>Adam</option>
                  <option value={"K. Roberts"}>Kieser</option>
                  <option value={"P. Black"}>Peyton</option>
                </select>
              </div>
            }
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>

  )
}
