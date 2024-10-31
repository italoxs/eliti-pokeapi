import { Container, Grid2 } from "@mui/material"
import axios from 'axios'
import Navbar from "../components/Navbar"
import PokemonCard from "../components/PokemonCard"
import { useEffect } from "react"
import { useState } from "react"
import { Skeletons } from "../components/Skeletons"

export const Home = () => {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    getPokemons()
  }, [])

  const getPokemons = () => {
    const endpoints = []

    for(let i = 1; i<=250; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`)
    }

    axios.all(endpoints.map(endpoint => axios.get(endpoint)))
      .then((response) => setPokemons(response))
  }

  const pokemonFilter = (name) => {
    let filteredPokemon = []

    if (name === '') {
      getPokemons()
    }

    for (let i in pokemons) {
      if (pokemons[i].data.name.includes(name)) {
        filteredPokemon.push(pokemons[i])
      }
    }
    setPokemons(filteredPokemon)
  }
  

  return (
    <div>
      <Navbar pokemonFilter={pokemonFilter} />
      <Container maxWidth="false">
        <Grid2 container spacing={3}>
          {pokemons.length === 0 ? <Skeletons /> : 
            pokemons.map((pokemon, key) => (
              <Grid2 item xs={12} sm={6} md={4} lg={6} key={key}>
                <PokemonCard 
                  name={pokemon.data.name}
                  image={pokemon.data.sprites.front_default}
                  types={pokemon.data.types}
                />
              </Grid2>
            ))
          }
        </Grid2>
      </Container>
    </div>
  )
}
