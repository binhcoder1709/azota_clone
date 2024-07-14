import { Button } from "antd";
import React from "react";
import CreateExamForm from "./exam_item/CreateExamForm";

export default function Exam() {
  return (
    <>
      <div className="azt-content flex items-center">
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
            placeholder="Tìm kiếm theo tên bài thi"
            type="text"
          />
        </div>
        <div></div>
        <div className="gap-2">
          <div className="flex item-center w-full m-top t-white">
            <CreateExamForm />
          </div>
        </div>
      </div>
    </>
  );
}
