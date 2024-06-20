import { Avatar, Flex, Menu, MenuButton, MenuDivider, MenuList, Text } from '@chakra-ui/react'
import { LuLogOut, LuNewspaper, LuSettings, LuUser } from 'react-icons/lu'

const MenuAvatar = () => {
    return (
        <>
            <Menu>
                <MenuButton>
                    <Flex className="items-center gap-2 cursor-pointer">
                        <Avatar size='md' showBorder={true} name="Phuc Hy" src="https://bit.ly/broken-link" />

                        <Flex className="flex-col justify-center">
                            <Text>Phúc Hỷ</Text>
                            <Text className="text-[14px] font-[500] text-gray-500">Admin</Text>
                        </Flex>
                    </Flex>
                </MenuButton>

                <MenuList minWidth='200px' className='px-2'>
                    <Flex className='items-center gap-2 p-2 cursor-pointer hover:bg-[#f1f5f9] rounded-md'>
                        <LuUser />
                        <Text>My Profile</Text>
                    </Flex>

                    <Flex className='items-center gap-2 p-2 cursor-pointer hover:bg-[#f1f5f9] rounded-md'>
                        <LuNewspaper />
                        <Text>Landing</Text>
                    </Flex>

                    <Flex className='items-center gap-2 p-2 cursor-pointer hover:bg-[#f1f5f9] rounded-md'>
                        <LuSettings />
                        <Text>Settings</Text>
                    </Flex>

                    <MenuDivider />

                    <Flex className='items-center gap-2 p-2 cursor-pointer hover:bg-[#fef1f1] text-[#f97d7d] rounded-md'>
                        <LuLogOut />
                        <Text>Logout</Text>
                    </Flex>
                </MenuList>
            </Menu>
        </>

    )
}

export default MenuAvatar
