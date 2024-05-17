import type { Championship } from '@prisma/client';
import clsx from 'clsx';
import { Command } from 'cmdk';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay,
} from 'react-aria-components';
import { Button, Icon } from './ui';

type ChampionshipSelectProps = {
  championships: Championship[];
  selected?: Championship;
  onSelectionChanged: (championship: Championship) => void;
};

export function ChampionshipSelect({
  championships,
  selected,
  onSelectionChanged,
}: ChampionshipSelectProps) {
  function handleSelect(slug: string) {
    setOpen(false);
    const nextChampionship = championships.find((c) => c.slug === slug);
    if (nextChampionship) onSelectionChanged(nextChampionship);
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
        <span className="sr-only text-sm sm:not-sr-only">Turnier</span>
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
              <Command.List className="border-default border-t p-2">
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
                      'flex select-none items-center justify-between rounded-lg px-4 py-2 font-semibold transition-colors data-[selected=true]:bg-content-hover',
                      selected?.id === c.id && 'text-selected',
                    )}
                    onSelect={handleSelect}
                    keywords={[c.name]}
                  >
                    <span>{c.name}</span>
                    {selected?.id === c.id && <Icon name="lucide/check" />}
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
