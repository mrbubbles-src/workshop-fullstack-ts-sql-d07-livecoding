import { ModeToggle } from '@/components/ui/shadcn/mode-toggle';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/shadcn/navigation-menu';

const Navbar = () => {
  return (
    <>
      <NavigationMenu className="bg-background fixed top-0 right-0 flex min-w-screen justify-between p-2">
        <NavigationMenuList className="flex gap-5">
          <NavigationMenuItem>
            <h1 className="mx-4 text-2xl font-bold">MEMODEX</h1>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList>
          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default Navbar;
