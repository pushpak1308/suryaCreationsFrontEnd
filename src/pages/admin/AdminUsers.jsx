import React, { useEffect, useState } from "react";
import styles from "./AdminUsers.module.css";

const API_URL = "/api/admin/users";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = () =>
    fetch(API_URL)
      .then((res) => res.json())
      .then(setUsers);

  useEffect(() => {
    fetchUsers();
  }, []);

  const blockUser = (id) => {
    fetch(`${API_URL}/${id}/block`, { method: "PUT" }).then(fetchUsers);
  };
  const unblockUser = (id) => {
    fetch(`${API_URL}/${id}/unblock`, { method: "PUT" }).then(fetchUsers);
  };
  const deleteUser = (id) => {
    if (window.confirm("Delete this user?")) {
      fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(fetchUsers);
    }
  };

  return (
    <div className={styles.adminUsers}>
      <h2>User Management</h2>
      <table className={styles.usersTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name/Email</th>
            <th>Status</th>
            <th>Block/Unblock</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>
                {u.firstName} {u.lastName} <br />
                <span style={{ color: "#8c824a" }}>{u.email}</span>
              </td>
              <td>
                {u.blocked ? (
                  <span className={styles.blocked}>Blocked</span>
                ) : (
                  <span className={styles.active}>Active</span>
                )}
              </td>
              <td>
                {u.blocked ? (
                  <button
                    className={styles.unblockBtn}
                    onClick={() => unblockUser(u.id)}
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    className={styles.blockBtn}
                    onClick={() => blockUser(u.id)}
                  >
                    Block
                  </button>
                )}
              </td>
              <td>
                <button
                  className={styles.deleteBtn}
                  onClick={() => deleteUser(u.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
