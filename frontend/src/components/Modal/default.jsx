import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const CustomModal = ({ isOpen, onClose, title, bodyContent, onConfirm }) => {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="flex justify-center items-center">
          <Text className="text-red-500">{title}</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>{bodyContent}</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onConfirm}>
            Confirm
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  bodyContent: PropTypes.node.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default CustomModal;
