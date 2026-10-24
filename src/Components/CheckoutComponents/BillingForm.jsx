import React from "react";

// প্রতিটা input-এর তথ্য এক জায়গায়, তাই বারবার লিখতে হয় না
const fields = [
  { name: "firstName", label: "First Name", required: true },
  { name: "companyName", label: "Company Name", required: false },
  { name: "street", label: "Street Address", required: true },
  { name: "apartment", label: "Apartment, floor, etc. (optional)", required: false },
  { name: "city", label: "Town/City", required: true },
  { name: "phone", label: "Phone Number", required: true, type: "tel" },
  { name: "email", label: "Email Address", required: true, type: "email" },
];

const BillingForm = ({ form, onChange, saveInfo, onSaveInfoChange, errors }) => {
  return (
    <div className="w-full lg:w-117.5">
      <h2 className="text-4xl font-medium tracking-wide mb-12">
        Billing Details
      </h2>

      <div className="grid gap-8">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-gray-400 mb-2">
              {field.label}
              {field.required && <span className="text-[#DB4444]">*</span>}
            </label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={form[field.name]}
              onChange={onChange}
              className="w-full h-12.5 px-4 bg-[#F5F5F5] rounded-sm outline-0"
            />
            {errors[field.name] && (
              <p className="text-[#DB4444] text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}
      </div>

      <label className="flex items-center gap-4 mt-8 cursor-pointer">
        <input
          type="checkbox"
          checked={saveInfo}
          onChange={onSaveInfoChange}
          className="w-6 h-6 accent-[#DB4444]"
        />
        <span>Save this information for faster check-out next time</span>
      </label>
    </div>
  );
};

export default BillingForm;