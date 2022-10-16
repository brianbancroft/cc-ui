import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import * as stories from './Header.stories'

const { Default } = composeStories(stories)

describe('document', () => {
  test('Has title ', () => {
    render(<Default />)

    expect(screen.getByText('testing in vite')).toBeInTheDocument()
    expect(screen.getByText('testing in vite')).toBeVisible()
  })
})
