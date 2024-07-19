import { useNavigation } from '@remix-run/react';
import { useEffect, useState } from 'react';
import {
  Link,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from 'ui';
import { Icon } from '#components/icon';
import { Logo } from '#components/logo';
import { ThemeMenu } from '#components/theme-menu';
import { useChampionship } from '#utils/app/use-championship';

export function Header() {
  const { championships, currentChampionship } = useChampionship();

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
          <NavbarItem>
            <NavLink href="/willkommen">Willkommen</NavLink>
          </NavbarItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
}
