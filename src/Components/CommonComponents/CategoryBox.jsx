import React from "react";

const CategoryBox = ({children,title}) => {
  return (
    <div className="w-[170px] py-6.25 px-13 border rounded-sm text-center group hover:bg-primary hover:border-0">
      <div>
        {children}
      </div>
      <h3 className="mt-4 group-hover:text-white">{title}</h3>
    </div>
  );
};

export default CategoryBox;
