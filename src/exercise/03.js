// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

const CounterContext = React.createContext()

function CounterProvider({...props}) {
  const [count, setCount] = React.useState(0)
  const value = {count, setCount}
  return <CounterContext.Provider value={value} {...props} />
}

// useCounter se encarga de lanzar errores para informar
// que solo se puede usar el customHook adentro de CounterProvider
const useCounter = () => {
  const context = React.useContext(CounterContext)
  if (!context) {
    throw new Error('useCounter must be child of CounterProvider')
  }
  return context
}

// * A partir de acá, se explicitan los consumidores del CounterContext

function CountDisplay() {
  const {count} = useCounter()
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  const {setCount} = useCounter()
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <CounterProvider>
      <CountDisplay />
      <Counter />
    </CounterProvider>
  )
}

export default App
