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
import UI from '#components/ui';
import { UserMenu } from '#components/user-menu';
import { useChampionship } from '#utils/app/foh/use-championship';
import { usePageTitle } from '#utils/app/use-page-title';
import { useIsAuthenticated } from '#utils/auth/user';

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
            <UI.NavLink href={`/${championshipSegment}`}>Tabelle</UI.NavLink>
          ) : (
            <UI.NavLink href="/willkommen">Startseite</UI.NavLink>
          )}
        </nav>
        <div className="flex items-center gap-x-2">
          {championships.length > 1 && <ChampionshipSelect />}
          <ThemeMenu />
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <div className="flex h-14 items-center gap-x-2">
              <UI.Divider orientation="vertical" className="ml-2 h-10" />
              <UI.NavLink href="/login">Log In</UI.NavLink>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-2 sm:hidden">
        <DialogTrigger isOpen={isOpen} onOpenChange={setOpen}>
          <UI.Button variant="toolbar">
            <UI.Icon name="menu" />
          </UI.Button>
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
                      <UI.Button variant="trigger" onPress={close}>
                        <UI.Icon className="size-6" name="x" />
                      </UI.Button>
                    </header>
                    <nav className="flex flex-col gap-y-2 p-2">
                      {championships.length > 0 ? (
                        <>
                          <UI.NavLink
                            className="data-[current]:bg-content-hover hover:bg-content-hover"
                            href={`/${championshipSegment}`}
                          >
                            <UI.Icon name="list-ordered">Tabelle</UI.Icon>
                          </UI.NavLink>
                          <UI.NavLink
                            className="data-[current]:bg-content-hover hover:bg-content-hover"
                            href={`/${[championshipSegment, 'spieler']
                              .filter(Boolean)
                              .join('/')}`}
                          >
                            <UI.Icon name="users">Spieler</UI.Icon>
                          </UI.NavLink>
                          <UI.NavLink
                            className="data-[current]:bg-content-hover hover:bg-content-hover"
                            href={`/${[championshipSegment, 'spiele']
                              .filter(Boolean)
                              .join('/')}`}
                          >
                            <UI.Icon name="dices">Spiele</UI.Icon>
                          </UI.NavLink>
                        </>
                      ) : (
                        <UI.NavLink href="/">Startseite</UI.NavLink>
                      )}
                    </nav>
                    <div className="flex flex-col gap-y-2 p-2">
                      {isAuthenticated ? (
                        <>
                          <UI.NavLink
                            href="/manager"
                            className="hover:bg-content-hover"
                          >
                            <UI.Icon name="settings">Manager</UI.Icon>
                          </UI.NavLink>
                          <Form action="/logout" method="post" className="flex">
                            <button
                              type="submit"
                              className="grow rounded-lg px-2 py-1.5 font-medium text-app-subtle text-sm hover:bg-content-hover hover:text-app focus:outline-none focus-visible:ring-2 focus-visible:ring-default focus-visible:ring-offset-2 focus-visible:ring-offset-default"
                            >
                              <UI.Icon name="log-out">Log Out</UI.Icon>
                            </button>
                          </Form>
                        </>
                      ) : (
                        <UI.NavLink
                          href="/login"
                          className="data-[current]:bg-content-hover hover:bg-content-hover"
                        >
                          <UI.Icon name="log-in">Log In</UI.Icon>
                        </UI.NavLink>
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
