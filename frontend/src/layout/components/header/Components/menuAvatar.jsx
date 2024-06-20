import { Avatar, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { LuLogOut, LuNewspaper, LuSettings, LuUser } from 'react-icons/lu'
import { Link } from 'react-router-dom'

const MenuAvatar = () => {
    return (
        <>
            <Menu closeOnSelect>
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
                    <MenuItem>
                        <Link to={'/owner/profile'}>
                            <Flex className='items-center gap-2 cursor-pointer rounded-md'>
                                <LuUser />
                                <Text>My Profile</Text>
                            </Flex>
                        </Link>
                    </MenuItem>

                    <MenuItem>
                        <Link to={''}>
                            <Flex className='items-center gap-2 cursor-pointer rounded-md'>
                                <LuNewspaper />
                                <Text>Landing</Text>
                            </Flex>
                        </Link>
                    </MenuItem>

                    <MenuItem>
                        <Link to={''}>
                            <Flex className='items-center gap-2 cursor-pointer rounded-md'>
                                <LuSettings />
                                <Text>Settings</Text>
                            </Flex>
                        </Link>
                    </MenuItem>

                    <MenuDivider />

                    <MenuItem>
                        <Link to={''}>
                            <Flex className='items-center gap-2 cursor-pointer hover:bg-[#fef1f1] text-[#f97d7d] rounded-md'>
                                <LuLogOut />
                                <Text>Logout</Text>
                            </Flex>
                        </Link>
                    </MenuItem>
                </MenuList>
            </Menu>
        </>

    )
}

export default MenuAvatar
