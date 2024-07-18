import {
  Link,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from 'ui';
import { Logo } from '#components/logo';
import { useChampionship } from '#utils/app/use-championship';

export function Header() {
  const { championships, currentChampionship } = useChampionship();

  const championshipSegment =
    currentChampionship?.id === championships[0]?.id
      ? ''
      : `/${currentChampionship?.slug}`;

  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/">
          <Logo />
        </Link>
      </NavbarBrand>
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
      <NavbarContent justify="end" />
    </Navbar>
  );
}
