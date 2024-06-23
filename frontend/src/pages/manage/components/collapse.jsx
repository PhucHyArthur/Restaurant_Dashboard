import { Box, Button, Collapse, Text } from "@chakra-ui/react"
import React from "react"

export default function CustomCollapse({ cartItems }) {

    console.log('check cartItems:', cartItems.length)

    const [show, setShow] = React.useState(false)

    const handleToggle = () => setShow(!show)

    return (
        <>
            <Collapse startingHeight={50} in={show}>
                {cartItems?.map((item, index) => {
                    const itemName = item.name
                    const itemCount = item.count
                    return (
                        <Box key={index}>{itemName} x {itemCount}</Box>
                    )
                })}
            </Collapse>
            <Button visibility={cartItems.length < 3 ? 'hidden' : 'visible'} className={`float-right border-[1px] border-black py-1 px-2 rounded-md`} size='sm' onClick={handleToggle}>
                Show {show ? 'Less' : 'More'}
            </Button>
        </>
    )
}