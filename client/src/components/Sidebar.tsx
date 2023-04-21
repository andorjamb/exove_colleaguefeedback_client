import React from "react";

const Sidebar = () => {
  return (
    <div>
      <nav
        id="sidenav"
        className="absolute left-0 top-0 h-full w-60 -translate-x-full overflow-hidden bg-medblack"
      >
        <ul className="relative m-0 list-none px-[0.2rem]">
          <li className="relative">
            <a href="/" className="flex h-12 truncate rounded-[5px] px-6 py-4">
              <span>Link 1</span>
            </a>
          </li>
          <li className="relative">
            <a
              href="/"
              className="flex h-12 truncate rounded-[5px] px-6 py-4 text-[0.875rem]"
            >
              <span>Category 1</span>
              <span
                className="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:text-gray-600 dark:[&>svg]:text-gray-300"
                data-te-sidenav-rotate-icon-ref
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </a>
            <ul className="!visible relative m-0 hidden list-none p-0">
              <li className="relative">
                <a
                  href="/"
                  className="flex h-6 items-center truncate rounded-[5px] py-4"
                >
                  Link 2
                </a>
              </li>
              <li className="relative">
                <a
                  href="/"
                  className="flex h-6 items-center truncate rounded-[5px] py-4"
                  data-te-sidenav-link-ref
                >
                  Link 3
                </a>
              </li>
            </ul>
          </li>
          <li className="relative">
            <a
              href="/"
              className="flex h-12 items-center truncate rounded-[5px] px-6 py-4"
            >
              Link4
            </a>
            <ul
              className="show !visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block "
              data-te-sidenav-collapse-ref
            >
              <li className="relative">
                <a
                  href="/"
                  className="flex h-6 items-center truncate rounded-[5px] py-4"
                >
                  Link 4
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <button className="mt-10 inline-block rounded bg-primary px-6"></button>
    </div>
  );
};

export default Sidebar;
