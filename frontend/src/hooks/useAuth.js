import React, { createContext, useContext, useState } from "react";
import * as userService from "../services/userService";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userService.getUser());

  const login = async (email, password) => {
    try {
      const data = await userService.login(email, password);
      setUser(data);
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const register = async (registerData) => {
    try {
      const data = await userService.register(registerData);
      setUser(data);
      toast.success("Register successful");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const logout = () => {
    userService.logout();
    setUser(null);
    toast.success("Logout successful");
  };
  const updateProfile = async (user) => {
    const updatedUser = await userService.updateProfile(user);
    toast.success("Profile updated was Successful");
    if (updatedUser) setUser(updatedUser);
  };

  const changePassword = async (passwords) => {
    await userService.changePassword(passwords);
    logout();
    toast.success("Password changed successfully! Plesae login again.");
  };
  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, updateProfile, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
