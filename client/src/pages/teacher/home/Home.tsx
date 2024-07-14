import React from "react";

export default function Home() {
  return (
    <>
      <div className="azt-content">
        <div className="ngcontent w-full mx-auto">
          <div className="intro-y mt-5">
            <h3 className="font-medium">Welcome to Azota 🎉</h3>
            <span>
              You can create Homework or Exam to test online or offline by
              Answer sheet.{" "}
              <a
                href="#"
                style={{
                  color: "#3755B8",
                }}
              >
                Read more
              </a>
            </span>
          </div>
          <div className="intro-y box-content mb-3 mt-10">
            <div className="box-item px-5 py-5">
              <div className="icon-i mr-8">
                <img
                  alt=""
                  height="44"
                  src="file-plus-alt-1-svgrepo-com.png"
                  width="44"
                />
              </div>
              <a className="mr-8 t-der sz-text" href="#">
                Create exercises or exams
              </a>
            </div>
            <div className="box-item px-5 py-5">
              <div className="icon-i mr-8">
                <img alt="" height="44" src="bank.png" width="44" />
              </div>
              <a className="mr-8 t-der sz-text" href="#">
                Create new exam from global bank
              </a>
            </div>
            <div className="box-item px-5 py-5">
              <div className="icon-i mr-8">
                <img
                  alt=""
                  height="44"
                  src="cloud-arrow-down-svgrepo-com.png"
                  width="44"
                />
              </div>
              <a className="mr-8 t-der sz-text" href="#">
                Download exam from Azota's global bank
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
