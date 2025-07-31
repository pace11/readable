import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { NewspaperIcon, BookmarkIcon } from 'lucide-react'

export const Route = createRootRoute({
  component: () => (
    <div className="container w-full max-w-sm mx-auto">
      <div className="top-0 sticky bg-[#f0f8ff] w-full z-10 border-b-[1px] border-[#22c55e] py-2">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to="/" className="flex-row items-center gap-2">
                  <NewspaperIcon color="#22c55e" />
                  <span className="font-bold">Home</span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to="/saved" className="flex-row items-center gap-2">
                  <BookmarkIcon color="#22c55e" />
                  <span className="font-bold">Saved</span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="p-2">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </div>
  ),
})
