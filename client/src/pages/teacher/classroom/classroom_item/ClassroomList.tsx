import { Button, Card } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import DropdownHover from "../../../../components/DropdownHover";
import { FC } from "react";
import { Classroom } from "../Classroom";

interface Props {
  classroomList: Classroom[];
}

const ClassroomList: FC<Props> = (prop) => {
  const dropdownItems = [
    {
      key: "1",
      label: <button>Xem thông tin</button>,
    },
    {
      key: "2",
      label: <button>Chỉnh sửa</button>,
    },
    {
      key: "3",
      danger: true,
      label: <button>Xóa lớp học</button>,
    },
  ];
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {prop.classroomList.map((item) => (
          <Card
            title={
              <>
                <div className="flex items-center justify-between">
                  <p className="overflow-hidden text-ellipsis">{item.name}</p>
                  <DropdownHover
                    itemHover={
                      <Button>
                        <FontAwesomeIcon icon={faEllipsis} />
                      </Button>
                    }
                    items={dropdownItems}
                  />
                </div>
              </>
            }
            bordered={false}
            style={{ width: 300 }}
          >
            <p>Số thành viên: 50</p>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ClassroomList;
