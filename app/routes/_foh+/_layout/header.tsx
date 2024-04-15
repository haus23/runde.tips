import { useNavigation } from '@remix-run/react';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  Form,
  Modal,
  ModalOverlay,
} from 'react-aria-components';
import { ChampionshipSelect } from '#components/championship-select';
import { Logo } from '#components/logo';
import { ThemeMenu } from '#components/theme-menu';
import { Button, Divider, Icon, NavLink } from '#components/ui';
import { UserMenu } from '#components/user-menu';
import { useIsAuthenticated } from '#utils/auth/user';
import { useOptionalChampionship } from '#utils/foh/championship.context';
import { usePublishedChampionships } from '#utils/foh/use-championships';
import { usePageTitle } from '#utils/foh/use-page-title';

export function Header() {
  const pageTitle = usePageTitle();
  const isAuthenticated = useIsAuthenticated();
  const championships = usePublishedChampionships();
  const championship = useOptionalChampionship();

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
    (championship?.id === championships[0]?.id ? '' : championship?.slug) || '';

  return (
    <header className="h-14 bg-app sticky top-0 grid max-w-6xl mx-auto px-2 sm:px-4">
      <div className="hidden sm:grid grid-cols-[auto_1fr_auto] gap-x-4 items-center">
        <Logo />
        <nav>
          {championships.length > 0 ? (
            <NavLink href={`/${championshipSegment}`}>Tabelle</NavLink>
          ) : (
            <NavLink href="/">Startseite</NavLink>
          )}
        </nav>
        <div className="flex items-center gap-x-2">
          {championships.length > 1 && <ChampionshipSelect />}
          <ThemeMenu />
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <div className="flex items-center gap-x-2 h-14">
              <Divider orientation="vertical" className="h-10 ml-2" />
              <NavLink href="/login">Log In</NavLink>
            </div>
          )}
        </div>
      </div>
      <div className="grid sm:hidden grid-cols-[auto_1fr_auto] gap-x-2 items-center">
        <DialogTrigger isOpen={isOpen} onOpenChange={setOpen}>
          <Button variant="toolbar">
            <Icon name="lucide/menu" />
          </Button>
          <ModalOverlay
            className="fixed inset-0 z-20 backdrop-blur-sm"
            isDismissable
          >
            <Modal className="fixed inset-4 bottom-auto z-20 mx-auto max-w-xl rounded-xl bg-popover shadow-medium ring-1 ring-default focus:outline-none">
              <Dialog className="flex flex-col focus:outline-none divide-y divide-default">
                {({ close }) => (
                  <>
                    <header className="flex justify-between items-center p-2">
                      <Logo />
                      <Button variant="trigger" onPress={close}>
                        <Icon className="size-6" name="lucide/x" />
                      </Button>
                    </header>
                    <nav className="flex flex-col p-2 gap-y-2">
                      {championships.length > 0 ? (
                        <>
                          <NavLink
                            className="hover:bg-content-hover data-[current]:bg-content-hover"
                            href={`/${championshipSegment}`}
                          >
                            Tabelle
                          </NavLink>
                          <NavLink
                            className="hover:bg-content-hover data-[current]:bg-content-hover"
                            href={`/${[championshipSegment, 'spieler']
                              .filter(Boolean)
                              .join('/')}`}
                          >
                            Spieler
                          </NavLink>
                          <NavLink
                            className="hover:bg-content-hover data-[current]:bg-content-hover"
                            href={`/${[championshipSegment, 'spiele']
                              .filter(Boolean)
                              .join('/')}`}
                          >
                            Spiele
                          </NavLink>
                        </>
                      ) : (
                        <NavLink href="/">Startseite</NavLink>
                      )}
                    </nav>
                    <div className="flex flex-col p-2 gap-y-2">
                      <div className="flex justify-between items-center px-2">
                        <span className="text-app-subtle font-medium">
                          Hell-/Dunkel-Modus
                        </span>
                        <ThemeMenu />
                      </div>
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
                              className="grow py-1.5 px-2 rounded-lg font-medium text-sm
                  text-app-subtle hover:text-app hover:bg-content-hover
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-default focus-visible:ring-offset-default
                "
                            >
                              <Icon name="lucide/log-out">Log Out</Icon>
                            </button>
                          </Form>
                        </>
                      ) : (
                        <NavLink
                          href="/login"
                          className="hover:bg-content-hover data-[current]:bg-content-hover"
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
        <h1 className="text-xl font-medium">{pageTitle}</h1>
        <ChampionshipSelect />
      </div>
    </header>
  );
}
