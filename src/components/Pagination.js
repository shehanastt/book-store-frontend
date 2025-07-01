const Pagination = ({ currentPage, limit, total, onPageChange }) => {
  const totalPages = Math.ceil(total / limit);

  if (totalPages === 1) return null; // don't show pagination if only 1 page

  return (
    <ul className="pagination justify-content-center my-4">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
          &laquo;
        </button>
      </li>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(page)}>
            {page}
          </button>
        </li>
      ))}

      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
          &raquo;
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
