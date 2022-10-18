import { useState } from 'react'

import ConverterCurrency from './components/ConverterCurrency/ConverterCurrency'
import { Header } from './components/Header'
import LoadingBadge from './components/LoadingBadge/LoadingBadge'

function App() {
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <>
      <Header />
      <main className="h-full w-screen">
        <ConverterCurrency setLoading={setLoading} />
        {loading && <LoadingBadge />}
      </main>
    </>
  )
}

export default App
