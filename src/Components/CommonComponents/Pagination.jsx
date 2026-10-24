import React from "react";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // এক পেজ বা তার কম হলে পেজিনেশন দেখানোর দরকার নেই
  if (totalPages <= 1) return null;

  // কোন কোন পেজ নম্বর দেখাবে তা ঠিক করা
  const getPages = () => {
    // মোট পেজ ৭ বা কম হলে সবগুলোই দেখাও
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // শুরুর দিকে: 1 2 3 4 5 ... শেষ
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    // শেষের দিকে: 1 ... শেষের ৫টি
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

    // মাঝখানে: 1 ... আগের, এখনকার, পরের ... শেষ
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

  const pages = getPages();

  return (
    <div className="flex justify-center items-center gap-2 py-10">
      {/* আগের পেজ */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border border-gray-400 rounded-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer enabled:hover:bg-red-500 enabled:hover:text-white enabled:hover:border-red-500 transition-colors duration-200"
      >
        Prev
      </button>

      {/* পেজ নম্বর */}
      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 border rounded-sm cursor-pointer ${
              currentPage === page
                ? "bg-red-500 text-white border-red-500"
                : "border-gray-400"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* পরের পেজ */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border border-gray-400 rounded-sm cursor-pointer transition-colors duration-200 enabled:hover:bg-red-500 enabled:hover:text-white enabled:hover:border-red-500 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;