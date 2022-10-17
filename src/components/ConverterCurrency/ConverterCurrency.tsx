import { useEffect, useState } from 'react'

import { api } from '../../util/api'

type CurrencyOption = {
  label: string
  code: string
}

type CurrencySelectorProps = {
  currencyList: CurrencyOption[]
  name: string
}

const CurrencySelector = ({ currencyList, name }: CurrencySelectorProps) => {
  return (
    <select name={name}>
      {currencyList.map((currency: CurrencyOption) => (
        <option key={currency.code} value={currency.code}>
          {currency.label}
        </option>
      ))}
    </select>
  )
}

function ConverterCurrency() {
  const [currencyList, setCurrencyList] = useState([])
  const [initialLoading, setInitialLoading] = useState(true)
  const [loadingError, setLoadingError] = useState(false)

  const [newAmount, setNewAmount] = useState(null)

  useEffect(() => {
    const retrieveCountries = async () => {
      const { data } = await api.get('/currencies')

      setCurrencyList(data.currencies)
    }
    retrieveCountries()
  }, [])

  async function handleSubmit(e: any) {
    e.preventDefault()

    const { target } = e
    const from: string = target[0].value
    const to: string = target[1].value
    const amount: number = target[2].value

    if (from === to) return

    const params = new URLSearchParams({ from, to })

    const {
      data: { rate },
    } = await api.get(`/currencies/rate?${params.toString()}`)

    setNewAmount(rate)
  }

  return (
    <section className="w-full h-full flex justify-center">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="currencyFrom">from</label>
          <CurrencySelector currencyList={currencyList} name="currencyFrom" />
        </div>
        <div>
          <label htmlFor="currencyTo">to</label>
          <CurrencySelector currencyList={currencyList} name="currencyTo" />
        </div>
        <div>
          <label htmlFor="amount">amount</label>
          <input type="number" name="amount" />
        </div>
        <p>submit</p>
        <input type="submit" name="submit" />
      </form>
    </section>
  )
}

export default ConverterCurrency
