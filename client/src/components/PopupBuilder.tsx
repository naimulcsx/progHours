import { ReactNode } from "react"
import { Modal } from "@mantine/core"

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
}: PopupBuilderProps) {
  return (
    <>
      <Modal opened={isOpen} onClose={() => setIsOpen(false)} title={title}>
        {children}
      </Modal>
    </>
  )
}
