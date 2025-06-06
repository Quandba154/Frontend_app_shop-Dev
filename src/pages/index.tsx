'use client'
import { useTheme } from '@mui/material'
import Head from 'next/head'
import CustomDataGrid from 'src/components/custom-data-grid'
import { useSettings } from 'src/hooks/useSettings'
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'

export default function Home() {
  const theme = useTheme()
  const { settings } = useSettings()
  console.log('theme', { theme, settings })

  return (
    <>
      <Head>
        <title>My website</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </>
  )
}


Home.getLayout = (page: React.ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>
Home.guestGuard = false
Home.authGuard = false



