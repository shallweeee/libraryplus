import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="grid h-screen grid-cols-1 lg:grid-cols-2">
      <div className="from-primary to-primary/50 hidden bg-gradient-to-br via-black lg:block" />
      <Outlet />
    </div>
  );
}
