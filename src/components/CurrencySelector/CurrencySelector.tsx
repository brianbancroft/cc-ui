import React from 'react'

type CurrencySelectorProps = {
  currencyList: CurrencyOption[]
  name: string
  handleSelect: () => void
}

type CurrencyOption = {
  label: string
  code: string
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
      disabled={currencyList.length === 0}
    >
      {currencyList.map((currency: CurrencyOption) => (
        <option key={currency.code} value={currency.code}>
          {currency.label}
        </option>
      ))}
    </select>
  )
}

export default CurrencySelector
