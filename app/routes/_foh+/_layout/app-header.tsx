import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import { Logo, ThemeMenu } from '#components';

export function AppHeader() {
  return (
    <Navbar>
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeMenu />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
