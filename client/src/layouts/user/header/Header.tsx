import { Avatar } from "antd";
import DropdownHover from "../../../components/DropdownHover";

export default function Header() {
  return (
    <>
      <div className="w-full h-[60px] border-b-2 flex items-center justify-end px-4">
        {/* avatar user btn */}
        <div>
          <DropdownHover itemHover={<Avatar className="cursor-pointer">bình</Avatar>} />
        </div>
      </div>
    </>
  );
}
