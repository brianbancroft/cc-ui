import { render, screen } from '@testing-library/react'
import { describe, expect, it, test } from 'vitest'

import App from './App'

describe('something truthy and falsy', () => {
  it('true to be true', () => {
    expect(true).toBe(true)
  })

  it('false to be false', () => {
    expect(false).toBe(false)
  })
})

describe('document', () => {
  test('Has title ', () => {
    render(<App />)

    expect(screen.getByText('testing in vite')).toBeInTheDocument()
    expect(screen.getByText('testing in vite')).toBeVisible()
  })
})
