import { Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from 'ui';
import { Logo } from '#components/logo';

export function Header() {
  return (
    <Navbar>
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem>
          <Link href="/willkommen">Willkommen</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/">Tabelle</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/spieler">Spieler</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" />
    </Navbar>
  );
}
