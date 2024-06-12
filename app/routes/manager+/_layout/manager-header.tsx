import { useNavigation } from '@remix-run/react';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay,
} from 'react-aria-components';
import { Button, Icon } from '#components/ui';
import { usePageTitle } from '#utils/app/use-page-title';
import { ManagerNav } from './manager-nav';

export function ManagerHeader() {
  const pageTitle = usePageTitle();

  const [isOpen, setOpen] = useState(false);
  const { state } = useNavigation();

  useEffect(() => {
    if (state === 'loading') setOpen(false);
  }, [state]);

  useEffect(() => {
    function closeDialog(ev: MediaQueryListEvent) {
      ev.matches && setOpen(false);
    }

    const query = window.matchMedia('(min-width: 640px)');

    query.addEventListener('change', closeDialog);
    return () => query.removeEventListener('change', closeDialog);
  }, []);

  return (
    <div className="flex items-center justify-between p-2 pt-3 md:px-4">
      <div className="flex items-center gap-x-2">
        <DialogTrigger
          isOpen={isOpen}
          onOpenChange={(isOpen) => setTimeout(() => setOpen(isOpen), 50)}
        >
          <Button variant="toolbar" className="flex md:hidden">
            <Icon name="lucide/menu" />
          </Button>
          <ModalOverlay
            className="fixed inset-0 z-20 backdrop-blur-sm"
            isDismissable
          >
            <Modal className="relative flex h-svh max-w-64 bg-popover">
              <Dialog className="flex grow focus:outline-none">
                {({ close }) => (
                  <>
                    <ManagerNav />
                    <Button
                      onPress={close}
                      variant="toolbar"
                      className="absolute top-2 right-2 bg-popover "
                    >
                      <Icon name="lucide/x" />
                    </Button>
                  </>
                )}
              </Dialog>
            </Modal>
          </ModalOverlay>
        </DialogTrigger>
        <h1 className="font-medium text-xl">{pageTitle || 'Manager'}</h1>
      </div>
    </div>
  );
}
