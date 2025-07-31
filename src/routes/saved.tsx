import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/saved')({
  component: Saved,
})

function Saved() {
  return (
    <div>
      <p>
        lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
      </p>
      <p>
        lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
      </p>
    </div>
  )
}
