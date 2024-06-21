import { Avatar } from "@files-ui/react";

export default function AvatarPicking({ imageSource, setImageSource }) {

    const handleChangeSource = (selectedFile) => {
        setImageSource(selectedFile)
    }
    return (
        <Avatar src={imageSource} changeLabel={"Upload Avatar"}
            alt="Avatar" variant="circle" onChange={handleChangeSource}
            style={{ width: "160px", height: '160px' }}
            smartImgFit='center'
        />
    );
}