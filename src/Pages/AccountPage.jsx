import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../Components/CommonComponents/Container";
import AccountSidebar from "../Components/AccountComponents/AccountSidebar";
import ProfileForm from "../Components/AccountComponents/ProfileForm";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <Container>
      <div className="pt-20 pb-20">
        {/* Breadcrumb */}
        <p className="text-gray-500 text-sm mb-20">
          <Link to="/" className="hover:underline">
            Home
          </Link>{" "}
          / <span className="text-black">My Account</span>
        </p>

        <div className="flex flex-col lg:flex-row gap-10">
          <AccountSidebar activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === "profile" ? (
            <ProfileForm />
          ) : (
            <div className="flex-1 py-20 text-center text-gray-500 shadow-[0_1px_13px_rgba(0,0,0,0.08)] rounded-sm">
              এই অংশটা শীঘ্রই আসছে
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default AccountPage;