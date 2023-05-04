import React, { FC } from 'react';
import styled from 'styled-components';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';

interface PaginationProps extends ReactPaginateProps {
    totalPages: number;
    currentPage: number;
    pageCount: number;
    handlePageChange: (selectedItem: { selected: number }) => void;
    previousLabel?: React.ReactNode;
    nextLabel?: React.ReactNode;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  
  .pagination {
    display: flex;
    justify-content: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .page-item {
    display: inline-block;
    margin-right: 0.25rem;
    border-radius: 0.25rem;
    cursor: pointer;
  }
  
  .active {
    background-color: #007bff;
    color: #fff;
  }
  
  .page-link {
    display: block;
    padding: 0.5rem 0.75rem;
    color: #007bff;
    text-decoration: none;
    background-color: transparent;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
  }
  
  .page-link:hover {
    color: #0056b3;
    background-color: #e9ecef;
    border-color: #dee2e6;
  }
  
  .disabled {
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.5;
  }
  
  .arrow-icon {
    vertical-align: middle;
  }
`;

/**
 * A reusable pagination component using ReactPaginate library.
 * @param {number} totalPages - Total number of pages.
 * @param {number} currentPage - Current active page number.
 * @param {function} handlePageChange - Function to handle page change event.
 */
const Pagination: FC<PaginationProps> = ({ totalPages, currentPage, handlePageChange, ...rest }) => {
    const previousLabel = <ArrowLeft className="arrow-icon" />;
    const nextLabel = <ArrowRight className="arrow-icon" />;
    
    return (
      <PaginationContainer>
        <ReactPaginate
          previousLabel={previousLabel}
          nextLabel={nextLabel}
          breakLabel={'...'}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          activeClassName={'active'}
          pageClassName={'page-item'}
          previousClassName={'page-item'}
          nextClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item disabled'}
          breakLinkClassName={'page-link'}
          forcePage={currentPage - 1}
          disableInitialCallback={true}
          {...rest}
        />
      </PaginationContainer>
    );
  };
  

export default Pagination;
