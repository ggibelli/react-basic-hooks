// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'
import {ErrorBoundary} from 'react-error-boundary'

type Status = 'idle' | 'loading' | 'resolved' | 'rejected'

interface State {
  status: Status
  pokemon?: any
}

function PokemonInfo({pokemonName}: {pokemonName: string}) {
  const [state, setState] = React.useState<State | null>(null)
  const [error, setError] = React.useState<any>(null)
  const [status, setStatus] = React.useState<Status>('idle')
  // 🐨 Have state for the pokemon (null)
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  React.useEffect(() => {
    if (!pokemonName) return
    setState({pokemon: null, status: 'loading'})
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setState({pokemon: pokemonData, status: 'resolved'})
      })
      .catch(e => {
        setError(e)

        setState({pokemon: null, status: 'rejected'})
      })
  }, [pokemonName])
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => { /* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />
  if (!pokemonName) return <>'Submit a pokemon'</>
  if (state?.status === 'rejected') throw new Error(error.message)
  if (pokemonName && !state?.pokemon)
    return <PokemonInfoFallback name={pokemonName} />
  // 💣 remove this
  return <PokemonDataView pokemon={state?.pokemon} />
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName: string) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          fallbackRender={({error, resetErrorBoundary}) => (
            <div role="alert">
              There was an error:
              <pre style={{whiteSpace: 'normal'}}>
                {error?.message && error.message}
              </pre>
              <button onClick={resetErrorBoundary}>Try again</button>
            </div>
          )}
          onReset={() => {
            setPokemonName('')
          }}
          resetKeys={[pokemonName]}
          // key={pokemonName}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
