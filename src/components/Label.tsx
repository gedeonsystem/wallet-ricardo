import { TextInput } from '@mantine/core'

type LabelProps = {
  label: string
  placeholder: string
}

export default function Label(props: LabelProps) {
  return <TextInput label={props.label} placeholder={props.placeholder} />
}
