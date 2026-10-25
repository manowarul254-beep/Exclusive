import React from "react";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // এক পেজ বা তার কম হলে পেজিনেশন দেখানোর দরকার নেই
  if (totalPages <= 1) return null;

  // বড় স্ক্রিনের জন্য: ১ থেকে ৫টি নম্বর পর্যন্ত দেখায়
  const getDesktopPages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  // মোবাইলের জন্য: সবচেয়ে কম নম্বর দেখায়
  const getMobilePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 2) {
      return [1, 2, 3, "...", totalPages];
    }
    if (currentPage >= totalPages - 1) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, "...", currentPage, "...", totalPages];
  };

  const arrowClass =
    "min-w-9 sm:min-w-0 px-2.5 sm:px-3 py-1 text-sm sm:text-base border border-gray-400 rounded-sm cursor-pointer transition-colors duration-200 enabled:hover:bg-red-500 enabled:hover:text-white enabled:hover:border-red-500 disabled:opacity-40 disabled:cursor-not-allowed";

  // পেজ নম্বরের তালিকা (মোবাইল ও ডেস্কটপ একই কাঠামো)
  const renderPages = (pages, prefix) =>
    pages.map((page, index) =>
      page === "..." ? (
        <span key={`${prefix}-dots-${index}`} className="px-1 text-gray-500">
          ...
        </span>
      ) : (
        <button
          key={`${prefix}-${page}`}
          onClick={() => onPageChange(page)}
          className={`min-w-9 sm:min-w-0 px-2.5 sm:px-3 py-1 text-sm sm:text-base border rounded-sm cursor-pointer transition-colors duration-200 ${
            currentPage === page
              ? "bg-red-500 text-white border-red-500"
              : "border-gray-400 hover:bg-red-100 hover:border-red-500"
          }`}
        >
          {page}
        </button>
      )
    );

  return (
    <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 py-10">
      {/* আগের পেজ */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={arrowClass}
      >
        <span className="sm:hidden">&lt;</span>
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* মোবাইলে এই অংশ দেখাবে */}
      <div className="flex items-center gap-1.5 sm:hidden">
        {renderPages(getMobilePages(), "m")}
      </div>

      {/* ট্যাবলেট ও ডেস্কটপে এই অংশ দেখাবে */}
      <div className="hidden sm:flex items-center gap-2">
        {renderPages(getDesktopPages(), "d")}
      </div>

      {/* পরের পেজ */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={arrowClass}
      >
        <span className="sm:hidden">&gt;</span>
        <span className="hidden sm:inline">Next</span>
      </button>
    </div>
  );
};

export default Pagination;