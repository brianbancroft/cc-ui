import { api } from '../util/api'

type retrieveRateArgs = {
  from: string
  to: string
}

type retrieveRateResponse = {
  rate: number
}

export async function retrieveRate(
  args: retrieveRateArgs
): Promise<retrieveRateResponse> {
  const { from, to } = args

  const params = new URLSearchParams({ from, to })

  const response = await api.get(`/currencies/rate?${params.toString()}`)

  const {
    data: { rate },
  } = response

  return { rate }
}
