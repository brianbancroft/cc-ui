import { api } from '../util/api'

type CurrencyOption = {
  label: string
  code: string
}

type retrieveCurrencyListResponse = {
  currencies: CurrencyOption[]
}

export async function retrieveCurrencies(): Promise<retrieveCurrencyListResponse> {
  const response = await api.get(`/currencies`)

  const {
    data: { currencies },
  } = response

  return { currencies }
}
