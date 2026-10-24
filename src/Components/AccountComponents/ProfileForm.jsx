import React, { useState } from "react";

const topFields = [
  { name: "firstName", label: "First Name", placeholder: "Md" },
  { name: "lastName", label: "Last Name", placeholder: "Rimel" },
  { name: "email", label: "Email", placeholder: "rimel1111@gmail.com", type: "email" },
  { name: "address", label: "Address", placeholder: "Kingston, 5236, United State" },
];

const passwordFields = [
  { name: "currentPassword", placeholder: "Current Password" },
  { name: "newPassword", placeholder: "New Password" },
  { name: "confirmPassword", placeholder: "Confirm New Password" },
];

const emptyPasswords = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const inputClass = "w-full h-12.5 px-4 bg-[#F5F5F5] rounded-sm outline-0";

const ProfileForm = () => {
  // আগে সেভ করা থাকলে সেটা দিয়ে ফর্ম ভরবে
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("profile");
    return saved
      ? JSON.parse(saved)
      : { firstName: "", lastName: "", email: "", address: "" };
  });
  const [passwords, setPasswords] = useState(emptyPasswords);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { currentPassword, newPassword, confirmPassword } = passwords;
    const wantsPasswordChange = currentPassword || newPassword || confirmPassword;

    if (wantsPasswordChange) {
      if (!currentPassword || !newPassword || !confirmPassword) {
        setError("পাসওয়ার্ড বদলাতে তিনটা ঘরই পূরণ করুন");
        return;
      }
      if (newPassword.length < 6) {
        setError("নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
        return;
      }
      if (newPassword !== confirmPassword) {
        setError("নতুন পাসওয়ার্ড দুই ঘরে মিলছে না");
        return;
      }
    }

    // পাসওয়ার্ড localStorage-এ রাখা হয় না, শুধু প্রোফাইল তথ্য
    localStorage.setItem("profile", JSON.stringify(profile));
    setPasswords(emptyPasswords);
    setSuccess("পরিবর্তন সেভ হয়েছে");
  };

  const handleCancel = () => {
    const saved = localStorage.getItem("profile");
    setProfile(
      saved
        ? JSON.parse(saved)
        : { firstName: "", lastName: "", email: "", address: "" }
    );
    setPasswords(emptyPasswords);
    setError("");
    setSuccess("");
  };

  return (
    <form
      onSubmit={handleSave}
      className="flex-1 px-6 lg:px-20 py-10 shadow-[0_1px_13px_rgba(0,0,0,0.08)] rounded-sm"
    >
      <h3 className="text-xl font-medium text-[#DB4444] mb-4">
        Edit Your Profile
      </h3>

      {/* নাম, ইমেইল, ঠিকানা */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
        {topFields.map((field) => (
          <div key={field.name}>
            <label className="block mb-2">{field.label}</label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={profile[field.name]}
              onChange={handleProfileChange}
              placeholder={field.placeholder}
              className={inputClass}
            />
          </div>
        ))}
      </div>

      {/* পাসওয়ার্ড বদলানো */}
      <div className="mt-6">
        <label className="block mb-2">Password Changes</label>
        <div className="grid gap-4">
          {passwordFields.map((field) => (
            <input
              key={field.name}
              type="password"
              name={field.name}
              value={passwords[field.name]}
              onChange={handlePasswordChange}
              placeholder={field.placeholder}
              className={inputClass}
            />
          ))}
        </div>
      </div>

      {error && <p className="text-[#DB4444] mt-4">{error}</p>}
      {success && <p className="text-green-600 mt-4">{success}</p>}

      <div className="flex items-center justify-end gap-8 mt-6">
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button
          type="submit"
          className="px-12 py-4 bg-[#DB4444] text-white rounded-sm font-medium"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;