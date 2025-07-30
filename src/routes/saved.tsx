import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/saved')({
  component: Saved,
})

function Saved() {
  return <div className="p-2">Hello from Saved!</div>
}