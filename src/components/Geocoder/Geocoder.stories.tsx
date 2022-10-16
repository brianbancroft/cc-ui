import { expect } from '@storybook/jest'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { within } from '@storybook/testing-library'

import Geocoder from './Geocoder'

export default {
  title: 'Geocoder',
  component: Geocoder,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Geocoder>

const Template: ComponentStory<typeof Geocoder> = (args: any) => (
  <Geocoder
    {...args}
    demo
    apiToken="pk.eyJ1IjoiYnJpYW5iYW5jcm9mdCIsImEiOiJsVGVnMXFzIn0.7ldhVh3Ppsgv4lCYs65UdA"
  />
)

export const Default = Template.bind({})
// Default.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement)

//   const el = canvas.getByText('testing in vite')

//   expect(el).toBeVisible()
// }
