// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

function Name() {
  const [name, setName] = React.useState('')

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={handleNameChange} />
    </div>
  )
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
function FavoriteAnimal({
  animal,
  onAnimalChange,
}: {
  animal: string
  onAnimalChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input id="animal" value={animal} onChange={onAnimalChange} />
    </div>
  )
}

// 🐨 uncomment this
function Display({animal}: {animal: string}) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>
}

function App() {
  // 🐨 add a useState for the animal
  const [animal, setAnimal] = React.useState('')

  return (
    <form>
      <Name />
      {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
      <FavoriteAnimal
        animal={animal}
        onAnimalChange={(event: {
          target: {value: React.SetStateAction<string>}
        }) => setAnimal(event.target.value)}
      />
      {/* 🐨 pass the animal prop here */}
      <Display animal={animal} />
    </form>
  )
}

export default App
