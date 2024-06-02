import { useNavigation } from '@remix-run/react';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  Form,
  Modal,
  ModalOverlay,
} from 'react-aria-components';
import { Logo } from '#components/logo';
import { ThemeMenu } from '#components/theme-menu';
import { Button, Divider, Icon, NavLink } from '#components/ui';
import { UserMenu } from '#components/user-menu';
import { useIsAuthenticated } from '#utils/auth/user';
import { useChampionship } from '#utils/foh/use-championship';
import { usePageTitle } from '#utils/foh/use-page-title';

import { ChampionshipSelect } from './championship-select';

export function Header() {
  const pageTitle = usePageTitle();
  const isAuthenticated = useIsAuthenticated();
  const { championships, currentChampionship } = useChampionship();

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

  const championshipSegment =
    (currentChampionship?.id === championships[0]?.id
      ? ''
      : currentChampionship?.slug) || '';

  return (
    <header className="sticky top-0 mx-auto grid h-14 max-w-6xl bg-app px-2 sm:px-4">
      <div className="hidden grid-cols-[auto_1fr_auto] items-center gap-x-4 sm:grid">
        <Logo />
        <nav>
          {championships.length > 0 ? (
            <NavLink href={`/${championshipSegment}`}>Tabelle</NavLink>
          ) : (
            <NavLink href="/willkommen">Startseite</NavLink>
          )}
        </nav>
        <div className="flex items-center gap-x-2">
          {championships.length > 1 && <ChampionshipSelect />}
          <ThemeMenu />
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <div className="flex h-14 items-center gap-x-2">
              <Divider orientation="vertical" className="ml-2 h-10" />
              <NavLink href="/login">Log In</NavLink>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-2 sm:hidden">
        <DialogTrigger isOpen={isOpen} onOpenChange={setOpen}>
          <Button variant="toolbar">
            <Icon name="lucide/menu" />
          </Button>
          <ModalOverlay
            className="fixed inset-0 z-20 backdrop-blur-sm"
            isDismissable
          >
            <Modal className="fixed inset-4 bottom-auto z-20 mx-auto max-w-xl rounded-xl bg-popover shadow-medium ring-1 ring-default focus:outline-none">
              <Dialog className="flex flex-col divide-y divide-default focus:outline-none">
                {({ close }) => (
                  <>
                    <header className="flex items-center justify-between p-2">
                      <Logo />
                      <Button variant="trigger" onPress={close}>
                        <Icon className="size-6" name="lucide/x" />
                      </Button>
                    </header>
                    <nav className="flex flex-col gap-y-2 p-2">
                      {championships.length > 0 ? (
                        <>
                          <NavLink
                            className="data-[current]:bg-content-hover hover:bg-content-hover"
                            href={`/${championshipSegment}`}
                          >
                            <Icon name="lucide/list-ordered">Tabelle</Icon>
                          </NavLink>
                          <NavLink
                            className="data-[current]:bg-content-hover hover:bg-content-hover"
                            href={`/${[championshipSegment, 'spieler']
                              .filter(Boolean)
                              .join('/')}`}
                          >
                            <Icon name="lucide/users">Spieler</Icon>
                          </NavLink>
                          <NavLink
                            className="data-[current]:bg-content-hover hover:bg-content-hover"
                            href={`/${[championshipSegment, 'spiele']
                              .filter(Boolean)
                              .join('/')}`}
                          >
                            <Icon name="lucide/dices">Spiele</Icon>
                          </NavLink>
                        </>
                      ) : (
                        <NavLink href="/">Startseite</NavLink>
                      )}
                    </nav>
                    <div className="flex flex-col gap-y-2 p-2">
                      {isAuthenticated ? (
                        <>
                          <NavLink
                            href="/manager"
                            className="hover:bg-content-hover"
                          >
                            <Icon name="lucide/settings">Manager</Icon>
                          </NavLink>
                          <Form action="/logout" method="post" className="flex">
                            <button
                              type="submit"
                              className="grow rounded-lg px-2 py-1.5 font-medium text-app-subtle text-sm hover:bg-content-hover hover:text-app focus:outline-none focus-visible:ring-2 focus-visible:ring-default focus-visible:ring-offset-2 focus-visible:ring-offset-default"
                            >
                              <Icon name="lucide/log-out">Log Out</Icon>
                            </button>
                          </Form>
                        </>
                      ) : (
                        <NavLink
                          href="/login"
                          className="data-[current]:bg-content-hover hover:bg-content-hover"
                        >
                          <Icon name="lucide/log-in">Log In</Icon>
                        </NavLink>
                      )}
                    </div>
                  </>
                )}
              </Dialog>
            </Modal>
          </ModalOverlay>
        </DialogTrigger>
        <h1 className="font-medium text-xl">{pageTitle}</h1>
        <div className="flex gap-x-2">
          <ChampionshipSelect />
          <ThemeMenu />
        </div>
      </div>
    </header>
  );
}
