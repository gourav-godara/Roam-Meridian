import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-border">
      <p className="text-sm text-muted">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-ink disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
          aria-label="Previous page"
        >
          <FiChevronLeft size={16} />
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-ink disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
          aria-label="Next page"
        >
          <FiChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
