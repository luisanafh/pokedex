import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const pageNumbers = [];
	const startPage = Math.max(1, currentPage - 2);
	const endPage = Math.min(totalPages, currentPage + 2);

	for (let i = startPage; i <= endPage; i++) {
		pageNumbers.push(i);
	}

	return (
		<nav aria-label="Page navigation">
			<ul className="pagination">
				<li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
					<button
						className="page-link"
						onClick={() => onPageChange(currentPage - 1)}
					>
						Previous
					</button>
				</li>
				{pageNumbers.map((number) => (
					<li
						key={number}
						className={`page-item ${number === currentPage ? 'active' : ''}`}
					>
						<button className="page-link" onClick={() => onPageChange(number)}>
							{number}
						</button>
					</li>
				))}
				<li
					className={`page-item ${
						currentPage === totalPages ? 'disabled' : ''
					}`}
				>
					<button
						className="page-link"
						onClick={() => onPageChange(currentPage + 1)}
					>
						Next
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
