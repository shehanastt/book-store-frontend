import React from "react";

const Pagination = ({ currentPage, limit, total, onPageChange}) => {

    const totalPages = Math.ceil(total / limit);

  return (
    <div className="d-flex justify-content-center align-items-center gap-3 my-4">
        <button className="btn btn-outline-secondary"
        onClick={()=>onPageChange(currentPage - 1)} disabled={currentPage===1}>
            &lt;
        </button>
        <span>{currentPage} of {totalPages}</span>
        <button className="btn btn-outline-secondary"
        onClick={()=>onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            &gt;
        </button>
    </div>
  )
}

export default Pagination