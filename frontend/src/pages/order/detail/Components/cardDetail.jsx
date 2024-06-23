import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Image,
} from "@chakra-ui/react";

const CardDetail = ({ cartItems }) => {

  return (
    <Accordion allowToggle>
      {cartItems?.map((item, index) => {
        return (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  {item.count} x {item.foodName}
                </Box>

                <Box as="span" flex="1" textAlign="right">
                  {Intl.NumberFormat().format(item.foodPrice * item.count)} ₫
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Image
                className="w-1/2 rounded-md overflow-hidden"
                src={item.foodImage}
                alt={item.foodName}
              />
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default CardDetail;
