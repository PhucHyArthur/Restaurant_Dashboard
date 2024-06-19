import { Box } from "@chakra-ui/react";
import {
    FaBell,
    FaGlobe,
    FaOptinMonster,
    FaSearch,
    FaSquare,
} from "react-icons/fa";

const DefaultHeader = () => {

    return (
        <Box className="flex items-center sticky top-0 z-10 bg-white" borderBottom={'1px solid #ccc'}>
            <Box className="header-logo flex justify-center items-center min-w-[260px]" borderRight={'1px solid #ccc'}>
                <img
                    className="w-[70px]"
                    src="https://i.imgur.com/WdNmCr0.png"
                    alt="logo"
                />
                <p>Wibu Food</p>
            </Box>

            <div className="header-nav flex items-center justify-between w-full">
                <div className="w-1/3 ml-5 relative">
                    <input type="text" placeholder="Search something..."
                        className="bg-transparent outline-none border-[1px] border-[#ccc] rounded-md px-5 py-2 w-full" />
                    <div className="absolute right-2 top-1/2 translate-y-[-50%] border-[1px] border-[#ccc] p-2 rounded-md bg-gray-300 hover:bg-gray-500">
                        <FaSearch />
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    <div className="text-lg p-3 rounded-full bg-[#dfdcdc]">
                        <FaGlobe />
                    </div>

                    <div className="text-lg p-3 rounded-full bg-[#dfdcdc]">
                        <FaSquare />
                    </div>

                    <div className="text-lg p-3 rounded-full bg-[#dfdcdc]">
                        <FaOptinMonster />
                    </div>

                    <div className="text-lg p-3 rounded-full bg-[#dfdcdc]">
                        <FaBell />
                    </div>

                    <div className="flex items-center">

                    </div>
                </div>
            </div>
        </Box>
    );
};

export default DefaultHeader;
