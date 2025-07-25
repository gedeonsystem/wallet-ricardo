import { TextInput } from '@mantine/core'
import type React from 'react'

type LabelProps = React.ComponentProps<'input'> & {
  label: string
  placeholder: string
  error: String
}

export default function Label({
  label,
  placeholder,
  error,
  ...props
}: LabelProps) {
  console.log('Errores:' + error)
  console.log('Errores:' + props)
  return (
    <div>
      <TextInput label={label} placeholder={placeholder} />
      {error && <p className="mt text-sm text-red-600">{error}</p>}
    </div>
  )
}
