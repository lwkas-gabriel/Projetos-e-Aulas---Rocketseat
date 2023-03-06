import { ThemeProvider } from 'styled-components'
import { useState } from 'react'
import { defaultTheme } from './styles/themes/default'

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <h1>teste</h1>
    </ThemeProvider>
  )
}
