import Geocoder from './components/Geocoder/Geocoder'
import { Header } from './components/Header'

const apiToken =
  'pk.eyJ1IjoiYnJpYW5iYW5jcm9mdCIsImEiOiJsVGVnMXFzIn0.7ldhVh3Ppsgv4lCYs65UdA'

function App() {
  function handleSelect(stuff: any) {
    console.log('Handle select ', stuff)
  }

  return (
    <>
      <Header />
      <main className="h-full w-screen">
        <Geocoder handleSelect={handleSelect} apiToken={apiToken} demo />
      </main>
    </>
  )
}

export default App
