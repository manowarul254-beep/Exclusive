import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// password কে hash করা, যাতে সরাসরি লেখা অবস্থায় জমা না থাকে
const hashPassword = async (password) => {
  const data = new TextEncoder().encode(password);
  const buffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  const startSession = (user) => {
    const session = { name: user.name, identifier: user.identifier };
    localStorage.setItem("currentUser", JSON.stringify(session));
    localStorage.setItem("isLoggedIn", "true"); // Navbar এটা ব্যবহার করে
    setCurrentUser(session);
  };

  // নতুন account খোলা
  const signup = async ({ name, identifier, password }) => {
    const users = getUsers();
    const id = identifier.trim().toLowerCase();

    if (users.some((u) => u.identifier === id)) {
      return { ok: false, message: "এই ইমেইল/ফোন দিয়ে আগেই account খোলা আছে" };
    }
    if (password.length < 6) {
      return { ok: false, message: "password কমপক্ষে ৬ অক্ষরের হতে হবে" };
    }

    const passwordHash = await hashPassword(password);
    const newUser = { name: name.trim(), identifier: id, passwordHash };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    startSession(newUser);
    return { ok: true };
  };

  // login করা
  const login = async ({ identifier, password }) => {
    const id = identifier.trim().toLowerCase();
    const user = getUsers().find((u) => u.identifier === id);

    if (!user) {
      return { ok: false, message: "এই ইমেইল/ফোন দিয়ে কোনো account নেই" };
    }

    const passwordHash = await hashPassword(password);
    if (passwordHash !== user.passwordHash) {
      return { ok: false, message: "password ভুল হয়েছে" };
    }

    startSession(user);
    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    setCurrentUser(null);
  };

  // password বদলানো (Profile page-এর জন্য)
  const changePassword = async (currentPassword, newPassword) => {
    const users = getUsers();
    const index = users.findIndex((u) => u.identifier === currentUser?.identifier);

    if (index === -1) return { ok: false, message: "আগে login করুন" };

    const currentHash = await hashPassword(currentPassword);
    if (currentHash !== users[index].passwordHash) {
      return { ok: false, message: "বর্তমান password ভুল" };
    }

    users[index].passwordHash = await hashPassword(newPassword);
    localStorage.setItem("users", JSON.stringify(users));
    return { ok: true };
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, signup, login, logout, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};