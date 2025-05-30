import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar";

import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 min-h-[300px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
