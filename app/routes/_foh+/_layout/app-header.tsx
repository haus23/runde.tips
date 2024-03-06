import {
  Divider,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import { useState } from 'react';
import { Logo, ThemeMenu } from '#components';
import { usePageTitle } from '#utils/foh/use-page-title';

export function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pageTitle = usePageTitle();

  return (
    <Navbar
      shouldHideOnScroll
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="data-[justify=start]:flex-grow-0">
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarItem className="sm:hidden text-xl pl-2">{pageTitle}</NavbarItem>
        <NavbarBrand className="hidden sm:flex">
          <Link color="foreground" href="/">
            <Logo />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex" justify="start">
        <NavbarItem>
          <Link color="foreground" href="/">
            Tabelle
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="hidden sm:flex">
        <NavbarItem>
          <ThemeMenu />
        </NavbarItem>
        <Divider orientation="vertical" className="h-[75%]" />
        <NavbarItem>
          <Link color="foreground" href="/login">
            Log In
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link
            color="foreground"
            size="lg"
            href="/"
            onPress={() => setIsMenuOpen(false)}
          >
            Tabelle
          </Link>
        </NavbarMenuItem>
        <Divider orientation="horizontal" />
        <NavbarMenuItem>
          <Link
            color="foreground"
            size="lg"
            href="/login"
            onPress={() => setIsMenuOpen(false)}
          >
            Log In
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="flex items-center justify-between">
          <span>Hell-/Dunkelmodus</span>
          <ThemeMenu onSelection={() => setIsMenuOpen(false)} />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
