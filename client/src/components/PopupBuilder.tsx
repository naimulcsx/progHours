import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, ReactNode, useState } from "react"

interface PopupBuilderProps {
  children?: ReactNode
  title: string
  isOpen: boolean
  setIsOpen: Function
  className?: string
  size?: string
  description?: string
}

export default function PopupBuilder({
  title,
  children,
  isOpen,
  setIsOpen,
  className,
  size = "lg",
  description,
}: PopupBuilderProps) {
  return (
    <Modal
      isOpen={isOpen}
      closeOnOverlayClick={false}
      onClose={() => setIsOpen(false)}
      size={size}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display="flex" flexDirection="column">
          <span>{title}</span>
          {description && (
            <Text as="span" color="gray.500" fontSize="sm">
              {description}
            </Text>
          )}
        </ModalHeader>
        <ModalCloseButton />
        {children}
      </ModalContent>
    </Modal>
  )
}
