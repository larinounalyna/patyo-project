"use client";

import "./page.css";
import Sidebar from "@/components/sidebar/sidebar";
import PageTitle from "@/components/page_title/page_title";
import Image from "next/image";

const profileData = {
  name: "Alexa Rawles",
  email: "alexarawles@gmail.com",
  fullName: "Alexa",
  nickName: "Alex",
  gender: "Female",
  country: "United States",
  language: "English",
  timeZone: "UTC -05:00",
};

function ProfilePage() {
  return (
    <div className="profile-right-side app-shell">
      <Sidebar />

      <main className="profile-content app-content">
        <div className="profile-header-block page-header-block">
          <PageTitle title="Profile" />
        </div>

        <section className="profile-surface" aria-label="User profile settings">
          <header className="profile-top">
            <div className="profile-user">
              <Image
                src="/profile.jpg"
                alt={profileData.name}
                className="profile-user-image"
                width={62}
                height={62}
              />
              <div>
                <h2>{profileData.name}</h2>
                <p>{profileData.email}</p>
              </div>
            </div>

            <button type="button" className="profile-edit-btn">
              Edit
            </button>
          </header>

          <div className="profile-form-grid">
            <label className="field-block">
              <span>Full Name</span>
              <input
                defaultValue={profileData.fullName}
                placeholder="Your First Name"
              />
            </label>

            <label className="field-block">
              <span>Nick Name</span>
              <input
                defaultValue={profileData.nickName}
                placeholder="Your Nick Name"
              />
            </label>

            <label className="field-block">
              <span>Gender</span>
              <select defaultValue={profileData.gender}>
                <option>Female</option>
                <option>Male</option>
                <option>Prefer not to say</option>
              </select>
            </label>

            <label className="field-block">
              <span>Country</span>
              <select defaultValue={profileData.country}>
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>France</option>
              </select>
            </label>

            <label className="field-block">
              <span>Language</span>
              <select defaultValue={profileData.language}>
                <option>English</option>
                <option>French</option>
                <option>Spanish</option>
              </select>
            </label>

            <label className="field-block">
              <span>Time Zone</span>
              <select defaultValue={profileData.timeZone}>
                <option>UTC -05:00</option>
                <option>UTC +00:00</option>
                <option>UTC +01:00</option>
              </select>
            </label>
          </div>

          <section className="email-section" aria-label="Email addresses">
            <h3>My email Address</h3>

            <div className="email-item">
              <div className="email-icon">✉</div>
              <div>
                <p>{profileData.email}</p>
                <small>1 month ago</small>
              </div>
            </div>

            <button type="button" className="add-email-btn">
              +Add Email Address
            </button>
          </section>
        </section>
      </main>
    </div>
  );
}

export default ProfilePage;
