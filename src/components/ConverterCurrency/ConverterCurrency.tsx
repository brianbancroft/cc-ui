import { useEffect, useState } from 'react'

import { retrieveCurrencies } from '../../api/retrieveCurrencies'
import { retrieveRate } from '../../api/retrieveRate'
import CurrencySelector from '../CurrencySelector/CurrencySelector'

type CurrencyOption = {
  label: string
  code: string
}

type SelectedCurrencyOptions = {
  from: string
  to: string
}

type RateRecord = {
  from: string
  to: string
  rate: number
}

function ConverterCurrency(props: any) {
  const { setLoading } = props

  const [currencyList, setCurrencyList] = useState<CurrencyOption[]>([])
  const [selectedCurrencyOptions, setSelectedCurrencyOptions] =
    useState<SelectedCurrencyOptions>({ from: '', to: '' })

  const [retrievedRate, setRetrievedRate] = useState<RateRecord>({
    from: '',
    to: '',
    rate: 1,
  })

  const [currencyAmount, setCurrencyAmount] = useState<number>(0)

  const updateSelectedOptions = (selector: string) => (event: any) => {
    setSelectedCurrencyOptions({
      ...selectedCurrencyOptions,
      [selector]: event.target.value,
    })
  }

  function swapSelectedCurrencies() {
    console.log('Swap currenci  ')

    const { from, to } = selectedCurrencyOptions

    setSelectedCurrencyOptions({
      from: to,
      to: from,
    })
  }

  // Handles initial load
  useEffect(() => {
    const retrieveCountries = async () => {
      setLoading(true)
      const { currencies } = await retrieveCurrencies()

      setCurrencyList(currencies)
      setSelectedCurrencyOptions({
        from: currencies[0].code,
        to: currencies[0].code,
      })
      setLoading(false)
    }
    retrieveCountries()
  }, [])

  // Handles effects from selected currency changes
  useEffect(() => {
    const { from, to } = selectedCurrencyOptions
    async function updateRate() {
      setLoading(true)
      const { rate } = await retrieveRate({ from, to })
      setRetrievedRate({ from, to, rate })

      setLoading(false)
    }

    if (
      from &&
      to &&
      from !== to &&
      retrievedRate.from !== from &&
      retrievedRate.to !== to
    ) {
      updateRate()
    }
  }, [selectedCurrencyOptions])

  function handleAmountChange(e: any) {
    setCurrencyAmount(e.target.value)
  }

  return (
    <section className="w-full h-full flex justify-center p-8">
      <div className="flex flex-col w-4/5 max-w-prose">
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
            handleSelect={updateSelectedOptions('from')}
            selectedOption={selectedCurrencyOptions.from}
          />
        </div>
        <div className="border rounded grid grid-cols-[100px_1fr] items-center my-1">
          <label htmlFor="currencyTo" className="px-2 capitalize font-semibold">
            to
          </label>
          <CurrencySelector
            currencyList={currencyList}
            name="currencyTo"
            handleSelect={updateSelectedOptions('to')}
            selectedOption={selectedCurrencyOptions.to}
          />
        </div>
        <div className="border rounded grid grid-cols-[100px_1fr] items-center my-1">
          <label htmlFor="amount" className="px-2 capitalize font-semibold">
            amount
          </label>
          <input
            type="number"
            name="amount"
            className="p-2 border-l"
            value={currencyAmount}
            onChange={handleAmountChange}
          />
        </div>
        <button
          type="button"
          name="submit"
          className="p-2 bg-blue-500 rounded text-white"
          onClick={swapSelectedCurrencies}
        >
          swap currencies
        </button>
      </div>
      <div className="border rounded grid grid-cols-[200px_1fr] items-center my-1 ml-2">
        <label htmlFor="amount" className="px-2 capitalize font-semibold">
          converted amount
        </label>
        <input
          readOnly
          value={Math.round(currencyAmount * retrievedRate.rate * 100) / 100}
          name="amount"
          className="p-2 border-l focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
        />
      </div>
    </section>
  )
}

export default ConverterCurrency
