import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'

export const UserContext = createContext() 

export const UserProvider = (props) => {
    const [userData, setUserData] = useState(
        {
            // token : localStorage.getItem('userToken'),
            user : localStorage.getItem('user')
        }
    )

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // console.log("Verifying token")
                const response = await axios.get('/api/auth/me')

                if (response.status === 200) {
                    localStorage.setItem('user', JSON.stringify(response.data))
                    // console.log("Verified jwt token");
                }
            } catch (error) {
                console.error("Error fetching user: ", error) 
                localStorage.setItem('user', null)
                setUserData({
                    user : null
                })
            }
        }
        fetchUser()
    } , [userData.user,setUserData])
  return (
    <UserContext.Provider value={[userData, setUserData]}>
        {props.children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)