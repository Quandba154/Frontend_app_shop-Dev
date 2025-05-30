// ** Next Imports
import { useRouter } from 'next/router'
// ** React Import
import { ReactNode, ReactElement, useEffect } from 'react'

import { useAuth } from 'src/hooks/useAuth'



interface NoGuardProps {
  children: ReactNode,
  fallback: ReactElement | null

}

const NoGuard = (props: NoGuardProps) => {
  // ** Props
  const { children, fallback } = props

  const auth = useAuth()

  if (auth.loading) {
    return fallback;
  }

  return (
    <> {children}</>
  )

}

export default NoGuard
