import React, { useEffect, useState } from "react";
import ClassroomList from "./classroom_item/ClassroomList";
import AddClassroomForm from "./classroom_item/AddClassroomForm";
import baseUrl from "../../../apis/axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";

export interface Classroom {
  id: string;
  name: string;
}

export default function Classroom() {
  const [classroomData, setClassroomData] = useState<Classroom[]>([]);
  const [classroomQuantity, setClassroomQuantity] = useState<number>(0);

  const fetchData = async () => {
    try {
      const response = await baseUrl.get("/user/teacher/classroom");
      setClassroomData(response.data.classrooms);
      setClassroomQuantity(response.data.totalClassroom)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div>
        <div className="azt-content">
          <div className="search-box-azt btn flex item-center w-full m-top">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />{" "}
              </g>
            </svg>
            <input
              className="form-control"
              placeholder="Tìm kiếm theo tên lớp học"
              type="text"
            />  
          </div>
          <div className="gap-2">
            <div className="flex item-center w-full m-top t-white">
              <AddClassroomForm  fetchData={fetchData}/>
            </div>
          </div>
        </div>
        <div className="p-6 flex flex-col gap-2">
          <h1 className="font-semibold text-xl">Lớp học đã tạo: {classroomQuantity}</h1>
          {<ClassroomList classroomList={classroomData} />}
        </div>
      </div>
    </>
  );
}
