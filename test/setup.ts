import { setGlobalConfig } from '@storybook/testing-react'
import matchers from '@testing-library/jest-dom/matchers'
import { expect } from 'vitest'

import * as globalStorybookConfig from '../.storybook/preview' // path of your preview.js file

setGlobalConfig(globalStorybookConfig)

expect.extend(matchers)
