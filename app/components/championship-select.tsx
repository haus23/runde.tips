import clsx from 'clsx';
import { Command } from 'cmdk';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay,
} from 'react-aria-components';
import { useCurrentChampionship } from '#utils/foh/championship.context';
import { usePublishedChampionships } from '#utils/foh/use-championships';
import { Button, Icon } from './ui';

export function ChampionshipSelect() {
  const championships = usePublishedChampionships();
  const { championship, setChampionship } = useCurrentChampionship();

  function handleSelect(slug: string) {
    setOpen(false);
    setChampionship(championships.find((c) => c.slug === slug) || championship);
  }

  const [open, setOpen] = useState(false);

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (ev: KeyboardEvent) => {
      if (ev.key === 'k' && (ev.metaKey || ev.ctrlKey)) {
        ev.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <DialogTrigger isOpen={open} onOpenChange={setOpen}>
      <Button variant="toolbar" className="gap-x-1 text-app-subtle">
        <Icon name="lucide/search" />
        <span className="text-sm">Turnier</span>
      </Button>
      <ModalOverlay
        className="fixed inset-0 z-20 backdrop-blur-sm"
        isDismissable
      >
        <Modal className="fixed inset-4 bottom-auto z-20 mx-auto max-w-xl rounded-xl bg-popover shadow-medium ring-1 ring-default focus:outline-none">
          <Dialog className="focus:outline-none">
            <Command label="Turnierauswahl" className="focus:outline-none" loop>
              <Command.Input
                autoFocus
                placeholder="Turnier"
                className="w-full rounded-xl bg-popover px-6 py-2.5 font-semibold text-app placeholder:text-app-subtle focus:outline-none"
              />
              <Command.List className="p-2 border-default border-t">
                <Command.Empty>
                  <div className="flex items-center justify-center gap-x-2 px-4 py-10 text-app-subtle">
                    <Icon name="lucide/folder" aria-hidden="true" />
                    <p className="font-semibold">
                      Kein Turnier passt zu der Suche.
                    </p>
                  </div>
                </Command.Empty>
                {championships.map((c) => (
                  <Command.Item
                    key={c.id}
                    value={c.slug}
                    className={clsx(
                      'flex items-center justify-between select-none px-4 py-2 rounded-lg font-semibold transition-colors data-[selected=true]:bg-content-hover',
                      championship.id === c.id && 'text-accent',
                    )}
                    onSelect={handleSelect}
                  >
                    <span>{c.name}</span>
                    {championship.id === c.id && <Icon name="lucide/check" />}
                  </Command.Item>
                ))}
              </Command.List>
            </Command>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
