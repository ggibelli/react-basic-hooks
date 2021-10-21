// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(
  key: string,
  initialValue = '',
): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [value, setValue] = React.useState<string>(
    () => window.localStorage.getItem(key) || initialValue,
  )

  React.useEffect(() => {
    window.localStorage.setItem(key, value)
  }, [key, value])

  return [value, setValue]
}

function Greeting({initialName = ''}: {initialName?: string}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
