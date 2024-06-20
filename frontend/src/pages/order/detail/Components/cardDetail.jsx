import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Image } from "@chakra-ui/react"

const CardDetail = ({ userListOrder }) => {
    // const formatData = JSON.parse(userListOrder[0])

    console.log('check type:', userListOrder)
    return (
        <Accordion allowToggle>
            {userListOrder?.map((item, index) => {
                return (
                    <AccordionItem key={index}>
                        <h2>
                            <AccordionButton>
                                <Box as='span' flex='1' textAlign='left'>
                                    {item.quantity} x {item.name}
                                </Box>

                                <Box as='span' flex='1' textAlign='right'>
                                    ${item.price}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <Image className="w-1/2 rounded-md overflow-hidden" src={item.imageUrl} alt={item.name} />
                        </AccordionPanel>
                    </AccordionItem>
                )
            })}
        </Accordion>
    )
}

export default CardDetail
