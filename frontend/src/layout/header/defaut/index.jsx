import {
  FaBell,
  FaDoorOpen,
  FaGlobe,
  FaOptinMonster,
  FaSquare,
} from "react-icons/fa";

const DefaultHeader = () => {
  
  return (
    <div className="flex items-center">
      <div className="header-logo max-w-[200px] w-full">
        <img
          className="w-[80px]"
          src="https://i.imgur.com/WdNmCr0.png"
          alt="logo"
        />
      </div>

      <div className="header-nav flex items-center justify-between w-full">
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search for items"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>

        <div className="flex items-center gap-5">
          <div className="text-lg p-3 rounded-full bg-red-500">
            <FaGlobe />
          </div>

          <div className="text-lg p-3 rounded-full bg-red-500">
            <FaSquare />
          </div>

          <div className="text-lg p-3 rounded-full bg-red-500">
            <FaOptinMonster />
          </div>

          <div className="text-lg p-3 rounded-full bg-red-500">
            <FaBell />
          </div>

          <div className="flex items-center">
            <details className="dropdown">
              <summary className="m-1 btn flex items-center gap-2 bg-transparent hover:bg-transparent border-none">
                <div className="avatar">
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>

                <div>
                  <p>Phuc Hy</p>
                  <p>Admin</p>
                </div>
              </summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                <li className="flex">
                  <div>
                    <div>
                      <FaDoorOpen />
                    </div>
                    <a>My profile</a>
                  </div>
                </li>
                <li className="flex">
                  <div>
                    <div>
                      <FaDoorOpen />
                    </div>
                    <a>Setting</a>
                  </div>
                </li>
                <li className="flex">
                  <div>
                    <div>
                      <FaDoorOpen />
                    </div>
                    <a className="text-red-400">Logout</a>
                  </div>
                </li>
              </ul>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultHeader;
