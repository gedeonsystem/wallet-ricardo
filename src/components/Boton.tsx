import { Button } from '@mantine/core'
import type React from 'react'

type BotonProps = React.ComponentProps<'button'> & {
  label: string
}

export default function Label(props: BotonProps) {
  return (
    <Button type="submit" fullWidth variant="filled">
      {props.label}
    </Button>
  )
}
