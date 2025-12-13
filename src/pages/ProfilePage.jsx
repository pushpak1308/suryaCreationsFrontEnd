import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import styles from "./ProfilePage.module.css";

function getInitials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0] || "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const ProfilePage = () => {
  const { user, updateUser, logout } = useAuth(); // updateUser should update user profile in context/backend
  const [edit, setEdit] = useState(false);

  // For editing form fields
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });
  const [saving, setSaving] = useState(false);

  if (!user) {
    return (
      <div className={styles.profilePage}>
        <div className={styles.profileContainer}>
          <h2>Please login to view your profile.</h2>
        </div>
      </div>
    );
  }

  // Update form fields
  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // Save handler
  const handleSave = async () => {
    setSaving(true);
    // Simulate backend update; replace with actual API call
    await new Promise((res) => setTimeout(res, 1000));
    updateUser(form); // update in context
    setEdit(false);
    setSaving(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setForm({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
    });
    setEdit(false);
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileContainer}>
        {/* Avatar */}
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="Profile"
            className={styles.profileAvatar}
          />
        ) : (
          <div className={styles.profileAvatarInitials}>
            {getInitials(`${form.firstName} ${form.lastName}`)}
          </div>
        )}

        {/* Profile Info (edit/view mode) */}
        <form
          className={styles.editForm}
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className={styles.profileFieldRow}>
            <label>First Name</label>
            <input
              disabled={!edit}
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.profileFieldRow}>
            <label>Last Name</label>
            <input
              disabled={!edit}
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.profileFieldRow}>
            <label>Email</label>
            <input disabled name="email" value={form.email} />
          </div>
          <div className={styles.profileFieldRow}>
            <label>Phone</label>
            <input
              disabled={!edit}
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div className={styles.profileFieldRow}>
            <label>Address</label>
            <textarea
              disabled={!edit}
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={2}
            />
          </div>
          <div className={styles.profileActions}>
            {!edit ? (
              <>
                <button
                  type="button"
                  className={styles.profileEditBtn}
                  onClick={() => setEdit(true)}
                >
                  Edit Profile
                </button>
                <button
                  type="button"
                  className={styles.profileLogoutBtn}
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  className={styles.profileSaveBtn}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  className={styles.profileCancelBtn}
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
