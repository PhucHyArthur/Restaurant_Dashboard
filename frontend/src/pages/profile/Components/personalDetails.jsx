import { Box, Button, Flex, Grid, Image, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import AvatarPicking from './avatar'

const PersonalDetails = () => {
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm()

    const [imageSource, setImageSource] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA-9w-zOzzGAyK-ExVZvG6IU4fznAvxDylAg&s')

    const onSubmit = (data) => console.log(data)

    console.log('check imageSource:', imageSource)


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
                            <Input {...register('fullName', { required: "Vui lòng không để trống" })} placeholder='Full Name' type='text' />
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
                            <Input {...register('location', { required: "Vui lòng không để trống" })} placeholder='Location' type='text' />
                            {errors.location && (
                                <Text className='text-red-500'>{errors.location.message}</Text>
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
