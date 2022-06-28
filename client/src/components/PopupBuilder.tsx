import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, ReactNode, useState } from "react"
import { twMerge } from "tailwind-merge"

interface PopupBuilderProps {
  children?: ReactNode
  title: string
  isOpen: boolean
  setIsOpen: Function
  className?: string
  size?: string
}

export default function PopupBuilder({
  title,
  children,
  isOpen,
  setIsOpen,
  className,
  size = "lg",
}: PopupBuilderProps) {
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size={size}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        {children}
      </ModalContent>
    </Modal>
  )
}
