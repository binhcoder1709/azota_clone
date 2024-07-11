
import Navigator from "../layouts/user/navigator/Navigator";
import Header from "../layouts/user/header/Header";
import Class from "../pages/student/class/Class";
import { Outlet } from "react-router-dom";

export default function StudentRoute() {
  return (
    <>
      <div className="bg-[#1d40af] w-full flex">
        {/* navigator */}
        <div className="w-[7%]">
          <Navigator />
        </div>
        {/* main */}
          <div className="w-full bg-white">
            <div>
              <Header />
            </div>
            <div className="h-[calc(100vh-60px)]">
              <Outlet/>
            </div>
          </div>
      </div>
    </>
  );
}
