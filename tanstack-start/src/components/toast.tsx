import { Toast } from "@base-ui/react/toast";

export const toast = Toast.createToastManager();

const ToastList = () => {
  const { toasts } = Toast.useToastManager();

  return toasts.map((item) => (
    <Toast.Root
      key={item.id}
      toast={item}
      className="rounded-md border bg-background p-4 shadow-md"
    >
      <Toast.Content>
        <Toast.Title className="font-medium" />
        <Toast.Description className="text-sm text-muted-foreground" />
      </Toast.Content>
    </Toast.Root>
  ));
};

export const Toaster = () => {
  return (
    <Toast.Provider toastManager={toast}>
      <Toast.Portal>
        <Toast.Viewport className="fixed right-4 bottom-4 z-50 flex w-80 flex-col gap-2">
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
};
