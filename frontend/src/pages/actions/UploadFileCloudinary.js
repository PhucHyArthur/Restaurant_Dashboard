import axios from "axios"

const uploadFileCloudinary = async (file) => {
    const formData = new FormData() 
    formData.append('file',file) 
    formData.append('upload_preset','j9rkirfq') 

    try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dpxey0jta/image/upload', formData)

        if (response.status === 200) {
            return response.data.secure_url
        }

    } catch (error) {
        console.error(error)
        return ''
    }
}

export default uploadFileCloudinary