import { Button, Modal } from "@mantine/core";

export interface DeleteModalProps {
  opened: boolean;
  open: () => void;
  close: () => void;
}

export function DeleteModal({ opened, open, close }: DeleteModalProps) {
  return (
    <Modal opened={opened} onClose={close} title="Delete">
      <div>
        <p>Are you sure you want to delete it?</p>
      </div>
      <Button variant="outline" onClick={close}>
        Cancel
      </Button>
      <Button
        variant="error"
        onClick={() => {
          console.log("clicked");
        }}
      >
        Delete
      </Button>
    </Modal>
  );
}
