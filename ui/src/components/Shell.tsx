import React from 'react'
import { AppShell, Header, Navbar } from "@mantine/core";

interface ShellProps {
  children: React.ReactNode
}

export default function Shell(props: ShellProps) {
  return (
    <AppShell
      navbar={
        <Navbar width={{
          xs: 192,
          sm: 192,
          md: 192,
          lg: 192,
          xl: 192
        }}>
          <Navbar.Section>
            <h1>My App</h1>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={32}>

        </Header>
      }
    >
      {props.children}
    </AppShell>
  )
}
