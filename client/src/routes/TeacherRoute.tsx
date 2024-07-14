import React, { useEffect, useState } from "react";
import Navigator from "../layouts/user/navigator/Navigator";
import Header from "../layouts/user/header/Header";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {jwtDecode} from "jwt-decode";

interface JwtPayload {
  role: number;
}

const TeacherRoute: React.FC = () => {
  const accessToken = useSelector((state: RootState) => state.token.accessToken);
  const refreshToken = useSelector((state: RootState) => state.token.refreshToken);
  const [role, setRole] = useState<number | null>(null);

  useEffect(() => {
    if (accessToken) {
      try {
        const decodedPayload = jwtDecode<JwtPayload>(accessToken);
        setRole(decodedPayload.role);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [accessToken]);

  if (!accessToken || !refreshToken) {
    return <Navigate to="/login" />;
  }

  if (role !== null && role !== 2) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navigator />
      <section className="home">
        <Header />
        <Outlet />
      </section>
    </>
  );
};

export default TeacherRoute;
