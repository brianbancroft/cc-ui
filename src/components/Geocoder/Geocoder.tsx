type Props = {
  demo?: boolean
  /** The mapbox token */
  apiToken: string
  handleSelect: (arg: any) => void
}

function SurroundElement({ children, demo }: any) {
  return demo ? (
    <section className="w-screen bg-slate-300 h-screen flex items-start py-24 justify-center">
      {children}
    </section>
  ) : (
    <>{children}</>
  )
}

/**
 * standard geocoder comp
 */
function Geocoder({ demo, apiToken, handleSelect }: Props) {
  function handleInputChange({ target }: { target: HTMLInputElement }) {
    const apiEndpoint = `https://api.mapbox.com/geocoding/v5/{endpoint}/{search_text}.json`

    console.log(target)
  }

  return (
    <SurroundElement demo={demo}>
      <input
        placeholder="geocoder"
        className="border border-gray-300 rounded-sm text-2xl px-4 py-2"
        onChange={handleInputChange}
      />
    </SurroundElement>
  )
}

export default Geocoder
