import { useEffect, useState } from 'react'

import { api } from '../../util/api'

type CurrencyOption = {
  label: string
  code: string
}

type CurrencySelectorProps = {
  currencyList: CurrencyOption[]
  name: string
  handleSelect: () => void
}

type NewAmount = {
  from: string
  to: string
  amount: number
  rate: number
}

const CurrencySelector = ({
  currencyList,
  name,
  handleSelect,
}: CurrencySelectorProps) => {
  return (
    <select
      className="border-l p-2 pr-8 bg-white"
      name={name}
      onChange={handleSelect}
    >
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

  const [newAmount, setNewAmount] = useState<NewAmount>({
    from: '',
    to: '',
    amount: -1,
    rate: -1,
  })

  function clearResults() {
    setNewAmount({ ...newAmount, amount: -1 })
  }

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

    if (from === newAmount?.from && to === newAmount?.to) {
      setNewAmount({ ...newAmount, amount: amount * newAmount.rate })
      return
    }

    const params = new URLSearchParams({ from, to })

    const {
      data: { rate },
    } = await api.get(`/currencies/rate?${params.toString()}`)

    setNewAmount({ rate, from, to, amount: amount * rate })
  }

  return (
    <section className="w-full h-full flex justify-center p-8">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="border rounded grid grid-cols-[100px_1fr] items-center my-1">
          <label
            htmlFor="currencyFrom"
            className="px-2 capitalize font-semibold"
          >
            from
          </label>
          <CurrencySelector
            currencyList={currencyList}
            name="currencyFrom"
            handleSelect={clearResults}
          />
        </div>
        <div className="border rounded grid grid-cols-[100px_1fr] items-center my-1">
          <label htmlFor="currencyTo" className="px-2 capitalize font-semibold">
            to
          </label>
          <CurrencySelector
            currencyList={currencyList}
            name="currencyTo"
            handleSelect={clearResults}
          />
        </div>
        <div className="border rounded grid grid-cols-[100px_1fr] items-center my-1">
          <label htmlFor="amount" className="px-2 capitalize font-semibold">
            amount
          </label>
          <input type="number" name="amount" className="p-2 border-l" />
        </div>
        <input
          type="submit"
          name="submit"
          className="p-2 bg-blue-500 rounded text-white"
        />
      </form>
      <div className="border rounded grid grid-cols-[200px_1fr] items-center my-1 ml-2">
        <label htmlFor="amount" className="px-2 capitalize font-semibold">
          converted amount
        </label>
        <input
          readOnly
          value={
            newAmount.amount === -1
              ? 0
              : Math.round(newAmount.amount * 100) / 100
          }
          name="amount"
          className="p-2 border-l focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
        />
      </div>
    </section>
  )
}

export default ConverterCurrency
