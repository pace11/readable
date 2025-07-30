import { Button } from '@/components/ui/button'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <div className='container w-full max-w-sm mx-auto'>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/saved" className="[&.active]:font-bold">
          Saved
        </Link>
      </div>
      <hr />
      <Button>Click me</Button>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
})