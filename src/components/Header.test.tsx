import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import * as stories from './Header.stories'

const { Default } = composeStories(stories)

describe('document', () => {
  test('Has title ', () => {
    render(<Default />)

    expect(screen.getByText('generic currency converter')).toBeInTheDocument()
    expect(screen.getByText('generic currency converter')).toBeVisible()
  })
})
