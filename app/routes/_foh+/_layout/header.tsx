import { Form, useNavigation } from '@remix-run/react';
import { useEffect, useState } from 'react';

import { Divider } from '@nextui-org/divider';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/navbar';

import { Logo } from '#components/logo';
import { ThemeMenu } from '#components/theme-menu';
import { Icon } from '#components/ui/icon';
import { Link, NavLink } from '#components/ui/link';
import { useChampionship } from '#utils/app/use-championship';
import { useIsAuthenticated } from '#utils/auth';

export function Header() {
  const { championships, currentChampionship } = useChampionship();
  const isAuthenticated = useIsAuthenticated();

  const championshipSegment =
    currentChampionship?.id === championships[0]?.id
      ? ''
      : `/${currentChampionship?.slug}`;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state } = useNavigation();

  useEffect(() => {
    if (state === 'loading') setIsMenuOpen(false);
  }, [state]);

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      disableAnimation={true}
      classNames={{ wrapper: 'px-4' }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label="Menü öffnen bzw. schließen"
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <Logo />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {championships.length > 0 ? (
          <>
            <NavbarItem>
              <NavLink href={`${championshipSegment || '/'}`}>Tabelle</NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink href={`${championshipSegment}/spieler`}>Spieler</NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink href={`${championshipSegment}/spiele`}>Spiele</NavLink>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <NavLink href="/willkommen">Willkommen</NavLink>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarContent justify="end">
        <ThemeMenu />
        <Divider
          orientation="vertical"
          className="hidden w-0.5 scale-75 sm:block"
        />
        <NavbarItem className="hidden sm:list-item">
          {isAuthenticated ? (
            <Form action="/logout" method="post" className="flex">
              <button
                type="submit"
                className="tap-highlight-transparent relative inline-flex cursor-default items-center text-foreground text-medium no-underline outline-none transition-opacity hover:opacity-80 active:opacity-disabled data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2"
              >
                Log Out
              </button>
            </Form>
          ) : (
            <NavLink href="/login">Log In</NavLink>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {championships.length > 0 ? (
          <>
            <NavbarMenuItem>
              <NavLink
                className="w-full"
                size="lg"
                href={`${championshipSegment || '/'}`}
              >
                <Icon name="list-ordered">Tabelle</Icon>
              </NavLink>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <NavLink
                className="w-full"
                size="lg"
                href={`${championshipSegment}/spieler`}
              >
                <Icon name="users">Spieler</Icon>
              </NavLink>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <NavLink
                className="w-full"
                size="lg"
                href={`${championshipSegment}/spiele`}
              >
                <Icon name="dices">Spiele</Icon>
              </NavLink>
            </NavbarMenuItem>
          </>
        ) : (
          <NavbarMenuItem>
            <NavLink href="/willkommen">
              <Icon name="house">Willkommen</Icon>
            </NavLink>
          </NavbarMenuItem>
        )}
        <Divider />
        <NavbarMenuItem>
          {isAuthenticated ? (
            <Form action="/logout" method="post" className="flex">
              <button
                type="submit"
                className="tap-highlight-transparent relative inline-flex cursor-default items-center text-foreground text-medium no-underline outline-none transition-opacity hover:opacity-80 active:opacity-disabled data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2"
              >
                <Icon name="log-out">Log Out</Icon>
              </button>
            </Form>
          ) : (
            <NavLink href="/login">
              <Icon name="log-in">Log In</Icon>
            </NavLink>
          )}
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
