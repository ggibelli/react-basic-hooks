// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Greeting({initialValue}: {initialValue: string}) {
  // 💣 delete this variable declaration and replace it with a React.useState call
  const [name, setName] = React.useState<string>(initialValue)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
    // 🐨 update the name here based on event.target.value
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
  return <Greeting initialValue="Rocco" />
}

export default App
