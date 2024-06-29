import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import AvatarPicking from './avatar'
import axios from 'axios'
import CustomToast from '../../../components/Toast'

const PersonalDetails = () => {
    const showToast = CustomToast()
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        setError,
        formState: { errors },
    } = useForm()

    const [imageSource, setImageSource] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA-9w-zOzzGAyK-ExVZvG6IU4fznAvxDylAg&s')

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/auth/me')
                if (response.status === 200) {
                    // console.log("User data:", response.data)
                    const user = response.data
                    setValue("username", user.name)
                    setValue("fullname", user.fullname) 
                    setValue("address", user.address)
                    setValue("number", user.phone)
                    
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }
        fetchUser()
    },[])

    const onSubmit = async (data) => {
        // console.log("user data:", data)
        try {
            const userData = {
                name : data.username,
                fullname : data.fullname,
                address : data.address,
                phone : data.number
            }
            const response = await axios.put('/api/user/edit', userData)

            if (response.status===200) {
                showToast('success', 'Profile edited successfully', '')
                console.log("User updated successfully:", response.data)
            }
        } catch (error) {
            console.error("Error updating user:", error);
            showToast('error', 'Profile edited failed', '')
        }
    }

    return (
        <Box className='w-full border-[1px] h-fit border-default rounded-lg p-5 mb-5'>
            <Text className='text-2xl font-[500]'>User Details</Text>

            <Flex className='gap-2'>
                <Box>
                    <AvatarPicking imageSource={imageSource} setImageSource={setImageSource} />
                </Box>

                <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                    <Box className='grid grid-cols-2 w-full gap-2'>
                        <Box className='w-full'>
                            <Input {...register('fullname', { required: "Vui lòng không để trống" })} placeholder='Full Name' type='text' />
                            {errors.fullName && (
                                <Text className='text-red-500'>{errors.fullName.message}</Text>
                            )}
                        </Box>

                        <Box className='w-full'>
                            <Input {...register('username', { required: "Vui lòng không để trống" })} placeholder='Username' type='text' />
                            {errors.username && (
                                <Text className='text-red-500'>{errors.username.message}</Text>
                            )}
                        </Box>

                        <Box className='w-full'>
                            <Input {...register('address', { required: "Vui lòng không để trống" })} placeholder='Address' type='text' />
                            {errors.address && (
                                <Text className='text-red-500'>{errors.address.message}</Text>
                            )}
                        </Box>

                        <Box className='w-full'>
                            <Input {...register('number', { required: "Vui lòng không để trống" })} placeholder='Phone Number' type='number' />
                            {errors.number && (
                                <Text className='text-red-500'>{errors.number.message}</Text>
                            )}
                        </Box>
                    </Box>

                    <Button className='mt-5 float-right' px={5} border={'1px solid #ccc'} bg={'white'} _hover={{ border: '1px solid black' }} rounded={100} type='submit'>Submit</Button>
                </form>
            </Flex>

        </Box>
    )
}

export default PersonalDetails
