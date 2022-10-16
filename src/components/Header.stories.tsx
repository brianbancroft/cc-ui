import { expect } from '@storybook/jest'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { within } from '@storybook/testing-library'

import { Header } from './Header'

export default {
  title: 'Components/Header',
  component: Header,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = (args: any) => (
  <Header {...args} />
)

export const Default = Template.bind({})
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  const el = canvas.getByText('testing in vite')

  expect(el).toBeVisible()
}
