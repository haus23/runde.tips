import { Navbar, NavbarBrand } from '@nextui-org/react';
import { Logo } from '#components';

export function AppHeader() {
  return (
    <Navbar>
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
    </Navbar>
  );
}
