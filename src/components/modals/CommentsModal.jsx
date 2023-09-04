import React from 'react'

export default function CommentModal({ setComment, comment, handleSubmit }) {
  return (

    <div className="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="commentModalLabel">Leave A Comment</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="comments" className="form-label">Comment</label>
              <textarea type="comments" className="form-control" id="comments"
                onChange={(e) => setComment(e.target.value)} >{comment}</textarea>
            </div>
            
            
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
