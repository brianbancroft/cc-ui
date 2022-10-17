import ConverterCurrency from './components/ConverterCurrency/ConverterCurrency'
import { Header } from './components/Header'

function App() {
  return (
    <>
      <Header />
      <main className="h-full w-screen">
        <ConverterCurrency />
      </main>
    </>
  )
}

export default App
