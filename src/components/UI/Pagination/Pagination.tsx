'use client';
import {
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from 'react-icons/fa';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  showDoubleArrows?: boolean;
  labels?: {
    first?: string;
    last?: string;
    previous?: string;
    next?: string;
  };
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  showFirstLast = true,
  showPrevNext = true,
  showDoubleArrows = true,
  labels,
}: PaginationProps) {
  if (!totalPages || totalPages <= 1) return null;

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement>, page: number) => {
    event.preventDefault();
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5);
      } else if (currentPage >= totalPages - 2) {
        pages.push(totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2);
      }
    }

    return pages.map((pageNum) => (
      <button
        key={pageNum}
        type="button"
        onClick={(e) => handlePageChange(e, pageNum)}
        className={`cursor-pointer px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          pageNum === currentPage
            ? 'bg-[#16372D] text-white'
            : 'text-[#1D221B]/62 hover:bg-[#16372D] hover:text-white'
        }`}
      >
        {pageNum}
      </button>
    ));
  };

  return (
    <div className={`flex items-center justify-center gap-2 mt-8 ${className}`}>
      {showDoubleArrows && (
        <button
          type="button"
          onClick={(e) => handlePageChange(e, 1)}
          disabled={currentPage === 1}
          className="cursor-pointer p-2 text-[#1D221B]/62 rounded-md hover:bg-[#16372D] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          title={labels?.first}
        >
          <FaAngleDoubleLeft className="w-4 h-4" />
        </button>
      )}

      {showPrevNext && (
        <button
          type="button"
          onClick={(e) => handlePageChange(e, currentPage - 1)}
          disabled={currentPage === 1}
          className="cursor-pointer p-2 text-[#1D221B]/62 rounded-md hover:bg-[#16372D] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          title={labels?.previous}
        >
          <FaChevronLeft className="w-4 h-4" />
        </button>
      )}

      <div className="flex items-center gap-1">{renderPageNumbers()}</div>

      {showFirstLast && (
        <button
          type="button"
          onClick={(e) => handlePageChange(e, currentPage + 1)}
          disabled={currentPage === totalPages}
          className="cursor-pointer p-2 text-[#1D221B]/62 rounded-md hover:bg-[#16372D] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          title={labels?.next}
        >
          <FaChevronRight className="w-4 h-4" />
        </button>
      )}

      {showDoubleArrows && (
        <button
          type="button"
          onClick={(e) => handlePageChange(e, totalPages)}
          disabled={currentPage === totalPages}
          className="cursor-pointer p-2 text-[#1D221B]/62 rounded-md hover:bg-[#16372D] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          title={labels?.last}
        >
          <FaAngleDoubleRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
