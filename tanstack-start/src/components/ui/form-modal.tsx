import { type ReactElement, type ReactNode, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "./button";

type FormModalProps = {
  title: string;
  trigger: ReactElement;
  submit: ReactElement;
  isDone?: boolean;
  children: ReactNode;
  onClose?: () => void;
};

export const FormModal = ({
  title,
  trigger,
  submit,
  isDone,
  children,
  onClose,
}: FormModalProps) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);

    if (!open) {
      onClose?.();
    }
  };

  useEffect(() => {
    if (isDone) {
      setOpen(false);
      onClose?.();
    }
  }, [isDone, onClose]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={trigger} />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          {submit}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
