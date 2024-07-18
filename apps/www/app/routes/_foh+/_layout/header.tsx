import { NavLink, Navbar, NavbarBrand, NavbarContent, NavbarItem } from 'ui';
import { Logo } from '#components/logo';

export function Header() {
  return (
    <Navbar>
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem>
          <NavLink href="/willkommen">Willkommen</NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink href="/">Tabelle</NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink href="/spieler/nix">Spieler</NavLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" />
    </Navbar>
  );
}
