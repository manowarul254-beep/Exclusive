import React from "react";

const tabs = [
  { key: "profile", label: "My Profile" },
  { key: "address", label: "Address Book" },
  { key: "payment", label: "My Payment Options" },
];

const AccountSidebar = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-full lg:w-60">
      <h3 className="font-medium mb-4">Manage My Account</h3>
      <ul className="grid gap-2 pl-8">
        {tabs.map((tab) => (
          <li
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`cursor-pointer duration-200 hover:text-[#DB4444] ${
              activeTab === tab.key ? "text-[#DB4444]" : "text-gray-500"
            }`}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountSidebar;