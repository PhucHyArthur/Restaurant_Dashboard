import { Box, Center } from "@chakra-ui/react";
import { LuBell, LuGlobe, LuScan, LuSearch, LuSettings } from "react-icons/lu";
import MenuAvatar from "./Components/menuAvatar";
import CustomToast from "../../../components/Toast";

const DefaultHeader = () => {
    const showToast = CustomToast()

    const handleShowToast = () => {
        showToast('success', '', 'vui lòng thử lại sau')
    }

    return (
        <Box className="flex items-center sticky top-0 z-10 bg-white" borderBottom={'1px solid #ccc'}>
            <Box className="header-logo flex justify-center items-center min-w-[260px]" borderRight={'1px solid #ccc'}>
                <img
                    className="w-[70px]"
                    src="https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihbN6RoM_xsl761_AzX3DR4YgCDy2RyEFVvlyItZsbV4DqxQKxEfxwEsG549l6E727svRWMUq3WTmhJlVemZzYQw_QT7YSDDAQU=w1860-h927-rw-v1?fbclid=IwZXh0bgNhZW0CMTAAAR10rK6A_sUPQKva-TpPm_Y6j8ECx6EUFen40bFjh7YrgnVp9LFMOBTI4lI_aem_xZiD1pTMo6k4WlwKb3EMyw"
                    alt="logo"
                />
                <p>ChooseMe</p>
            </Box>

            <div className="header-nav flex items-center justify-between w-full mx-5">
                <div className="w-1/3 relative">
                    <input type="text" placeholder="Search something..."
                        className="bg-transparent outline-none border-[1px] border-[#ccc] rounded-md px-5 py-2 w-full" />
                    <div className="absolute right-2 top-1/2 translate-y-[-50%] border-[1px] border-[#ccc] p-[6px] rounded-md cursor-pointer bg-gray-300 hover:bg-gray-500">
                        <LuSearch />
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    <Center onClick={handleShowToast} className="text-[24px] w-12 h-12 rounded-full bg-[#f1f5f9] hover:text-[#f58220] cursor-pointer">
                        <LuGlobe />
                    </Center>

                    <Center onClick={handleShowToast} className="text-[24px] w-12 h-12 rounded-full bg-[#f1f5f9] hover:text-[#f58220] cursor-pointer">
                        <LuScan />
                    </Center>

                    <Center onClick={handleShowToast} className="text-[24px] w-12 h-12 rounded-full bg-[#f1f5f9] hover:text-[#f58220] cursor-pointer">
                        <LuSettings />
                    </Center>

                    <Center onClick={handleShowToast} className="text-[24px] w-12 h-12 rounded-full bg-[#f1f5f9] hover:text-[#f58220] cursor-pointer">
                        <LuBell />
                    </Center>

                    <MenuAvatar />
                </div>
            </div>
        </Box>
    );
};

export default DefaultHeader;
