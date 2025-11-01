import { Link } from '@tanstack/react-router'

import { IconSearch, IconFlame, IconArrowsExchange } from '@tabler/icons-react'
import {
  ActionIcon,
  Autocomplete,
  Burger,
  Group,
  Tooltip,
  useMantineColorScheme,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import classes from './Header.module.css'
import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false)
  const { colorScheme, setColorScheme } = useMantineColorScheme()

  const { text } = await generateText({
    model: openai('gpt-4-turbo'),
    prompt: 'Write a vegetarian lasagna recipe for 4 people.',
  })

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <Tooltip label="Home">
            <IconFlame stroke={2} />
          </Tooltip>
          <ActionIcon
            onClick={() => {
              setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
            }}
          >
            <Tooltip label="Cambiar Tema">
              <IconArrowsExchange stroke={2} />
            </Tooltip>
          </ActionIcon>
        </Group>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            <Link to="/" className={classes.link}>
              Inicio
            </Link>
            <Link
              to="/evento/$id"
              params={{ id: 'new' }}
              className={classes.link}
            >
              Nuevo Evento
            </Link>
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={<IconSearch size={16} stroke={1.5} />}
            data={[
              'React',
              'Angular',
              'Vue',
              'Next.js',
              'Riot.js',
              'Svelte',
              'Blitz.js',
            ]}
            visibleFrom="xs"
          />
        </Group>
      </div>
    </header>
  )
}
