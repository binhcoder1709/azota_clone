import React, { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../../assets/logos/logo_main.png";
import Class from "../../../assets/logos/class.png";

// Component Navigator sử dụng TypeScript và React
export default function Navigator(): JSX.Element {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const modeTextRef = useRef<HTMLSpanElement | null>(null);
  const bodyRef = useRef<HTMLBodyElement | null>(null);

  useEffect(() => {
    const toggle = document.querySelector(".toggle");
    const sidebar = sidebarRef.current;
    const searchBtn = document.querySelector(".bx-search");
    const modeSwitch = document.querySelector(".toggle-switch");
    const body = document.querySelector("body");
    const modeText = modeTextRef.current;

    if (toggle && sidebar && searchBtn && modeSwitch && body && modeText) {
      const handleToggleClick = () => {
        sidebar.classList.toggle("close");
      };

      const handleSearchClick = () => {
        sidebar.classList.remove("close");
      };

      const handleModeSwitchClick = () => {
        body.classList.toggle("dark");
        if (body.classList.contains("dark")) {
          modeText.innerText = "Light mode";
        } else {
          modeText.innerText = "Dark mode";
        }
      };

      toggle.addEventListener("click", handleToggleClick);
      searchBtn.addEventListener("click", handleSearchClick);
      modeSwitch.addEventListener("click", handleModeSwitchClick);

      return () => {
        toggle.removeEventListener("click", handleToggleClick);
        searchBtn.removeEventListener("click", handleSearchClick);
        modeSwitch.removeEventListener("click", handleModeSwitchClick);
      };
    }
  }, []);

  return (
    <>
      <nav className="sidebar close">
        <header>
          <div className="image-text">
            <span className="image">
              <img
                alt=""
                src="https://play-lh.googleusercontent.com/mEfS1gc3mTS3apcwQAzZRNhC_r5OgtEPPjja6hxVMGx2EKyTwDwYHfmq410q-8Mum6I"
              />
            </span>
            <div className="text logo-text">
              <span className="name">Azota</span>
              <span className="profession nav-text">Educational</span>
            </div>
          </div>
          {/* <i className="bx bx-chevron-right toggle" /> */}
        </header>
        <div className="menu-bar">
          <div className="menu">
            {/* <li className="search-box">
              <i className="bx bx-search icon" />
              <input placeholder="Search..." type="text" />
            </li> */}
            <ul className="menu-links">
              <li className="nav-link">
                <NavLink to="/teacher" end>
                  <i className="bx bx-home-alt icon" />
                  <span className="text nav-text">Trang chủ</span>
                </NavLink>
              </li>
              <li className="nav-link">
                <NavLink to="/teacher/classroom" title="Lớp học">
                  <i className="bx bxs-graduation icon" />
                  <span className="text nav-text">Lớp học</span>
                </NavLink>
              </li>
              <li className="nav-link">
                <NavLink to="/teacher/exams">
                  <i className="bx bx-detail icon" title="Bài thi"/>
                  <span className="text nav-text">Bài thi</span>
                </NavLink>
              </li>
              {/* <li className="nav-link">
                <a href="#">
                  <i className="bx bx-pie-chart-alt icon" />
                  <span className="text nav-text">Classes</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <i className="bx bx-heart icon" />
                  <span className="text nav-text">Teacher Management</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <i className="bx bx-wallet icon" />
                  <span className="text nav-text">Document Market</span>
                </a>
              </li> */}
            </ul>
          </div>
          <div className="bottom-content">
            <li className="mode">
              <div className="sun-moon">
                <i className="bx bx-moon icon moon" />
                <i className="bx bx-sun icon sun" />
              </div>
              <span className="mode-text text nav-text">Dark mode</span>
              <div className="toggle-switch">
                <span className="switch" />
              </div>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
}
