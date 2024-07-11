import { Link, NavLink } from "react-router-dom";
import Logo from "../../../assets/logos/logo_main.png";
import Class from '../../../assets/logos/class.png'

export default function Navigator() {
  return (
    <>
      <div className="w-full h-screen">
        {/* logo */}
        <div>
          <Link to={""}>
            <img src={Logo} className="w-[100px] h-[100px]" alt="" />
          </Link>
        </div>
        {/* navigator items */}
        <nav className="flex flex-col items-center gap-3">
            <NavLink to={"/student/class"} className="text-white font-semibold p-2 rounded-3xl">
                Lớp học
            </NavLink> 
            <NavLink to={"/student/exam-test"} className="text-white font-semibold p-2 rounded-3xl">
                Bài thi
            </NavLink>
        </nav>
      </div>
    </>
  );
}
