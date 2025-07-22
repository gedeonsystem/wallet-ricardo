import { Link } from '@tanstack/react-router'

import { IconSearch, IconFlame } from '@tabler/icons-react'
import { Autocomplete, Burger, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import classes from './Header.module.css'

const links = [
  { link: '/', label: 'Inicio' },
  { link: '/evento/new', label: 'Nuevo' },
]

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false)

  const items = links.map((link) => (
    <a key={link.label} href={link.link} className={classes.link}>
      {link.label}
    </a>
  ))

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <IconFlame stroke={2} />
        </Group>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
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
