import { Button, Collapse, Text } from "@chakra-ui/react"
import React from "react"

export default function CustomCollapse() {
    const [show, setShow] = React.useState(false)

    const handleToggle = () => setShow(!show)

    return (
        <>
            <Collapse startingHeight={50} in={show}>
                <Text>Thịt chó x 2</Text>
                <Text>Thịt mèo x 3</Text>
                <Text>Thịt trâu x 4</Text>
                <Text>Thịt ngựa x 5</Text>
                <Text>Thịt gấu x 6</Text>
                <Text>Thịt nai x 7</Text>
            </Collapse>
            <button className="float-end border-[1px] border-black py-1 px-2 rounded-md" size='sm' onClick={handleToggle}>
                Show {show ? 'Less' : 'More'}
            </button>
        </>
    )
}