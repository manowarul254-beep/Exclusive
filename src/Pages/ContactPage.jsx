import React, { useState } from "react";
import { IoCallOutline, IoMailOutline } from "react-icons/io5";
import Container from "../Components/CommonComponents/Container";

// বাঁ দিকের কার্ডের তথ্য
const infoBlocks = [
  {
    icon: IoCallOutline,
    title: "Call To Us",
    lines: ["We are available 24/7, 7 days a week.", "Phone: +8801611112222"],
  },
  {
    icon: IoMailOutline,
    title: "Write To US",
    lines: [
      "Fill out our form and we will contact you within 24 hours.",
      "Emails: customer@exclusive.com",
      "Emails: support@exclusive.com",
    ],
  },
];

// উপরের তিনটা input
const inputs = [
  { name: "name", placeholder: "Your Name", type: "text" },
  { name: "email", placeholder: "Your Email", type: "email" },
  { name: "phone", placeholder: "Your Phone", type: "tel" },
];

const emptyForm = { name: "", email: "", phone: "", message: "" };

const ContactPage = () => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccess("");
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "নাম লিখুন";
    if (!form.email.trim()) newErrors.email = "ইমেইল লিখুন";
    if (!form.phone.trim()) newErrors.phone = "ফোন নম্বর লিখুন";
    if (!form.message.trim()) newErrors.message = "আপনার বার্তা লিখুন";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // এখানে পরে server বা API-তে পাঠানোর কোড বসাতে পারবেন
    setSuccess("আপনার বার্তা পাঠানো হয়েছে, আমরা ২৪ ঘণ্টার মধ্যে যোগাযোগ করব।");
    setForm(emptyForm);
  };

  return (
    <Container>
      <div className="grid lg:grid-cols-[340px_1fr] gap-7.5 pt-20 pb-20">
        {/* বাঁ দিকের তথ্য কার্ড */}
        <div className="px-9 py-10 shadow-[0_1px_13px_rgba(0,0,0,0.08)] rounded-sm">
          {infoBlocks.map((block, index) => {
            const Icon = block.icon;
            return (
              <div
                key={block.title}
                className={
                  index === 0 ? "pb-8 border-b border-gray-400" : "pt-8"
                }
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#DB4444] text-white flex items-center justify-center">
                    <Icon className="text-xl" />
                  </div>
                  <h3 className="font-medium">{block.title}</h3>
                </div>

                <div className="grid gap-4 mt-6 text-sm">
                  {block.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ডান দিকের ফর্ম */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="p-8 shadow-[0_1px_13px_rgba(0,0,0,0.08)] rounded-sm"
        >
          <div className="grid md:grid-cols-3 gap-4">
            {inputs.map((input) => (
              <div key={input.name} className="relative">
                <input
                  type={input.type}
                  name={input.name}
                  value={form[input.name]}
                  onChange={handleChange}
                  placeholder={input.placeholder + " *"}
                  className="w-full h-12.5 px-4 bg-[#F5F5F5] rounded-sm outline-0 placeholder:text-gray-500"
                />
                {errors[input.name] && (
                  <p className="text-[#DB4444] text-sm mt-1">
                    {errors[input.name]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8">
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full h-51.5 p-4 bg-[#F5F5F5] rounded-sm outline-0 resize-none placeholder:text-gray-500"
            />
            {errors.message && (
              <p className="text-[#DB4444] text-sm mt-1">{errors.message}</p>
            )}
          </div>

          {success && <p className="text-green-600 mt-4">{success}</p>}

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="px-12 py-4 bg-[#DB4444] text-white rounded-sm font-medium cursor-pointer hover:bg-red-600 transition-colors duration-200"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default ContactPage;