import { Container, Grid2 } from "@mui/material"
import axios from 'axios'
import Navbar from "../components/Navbar"
import PokemonCard from "../components/PokemonCard"
import { useEffect } from "react"
import { useState } from "react"

export const Home = () => {
  const [pokemons, setPokemons] = useState([])
  useEffect(() => {
    getPokemons()
  }, [])

  const getPokemons = () => {
    const endpoints = []

    for(let i = 1; i<=50; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`)
    }

    const response = axios.all(endpoints.map(endpoint => axios.get(endpoint)))
      .then((response) => setPokemons(response))
  }
  

  return (
    <div>
      <Navbar />
      <Container maxWidth="false">
        <Grid2 container spacing={4}>
          {pokemons.map((pokemon, key) => (
            <Grid2 item xs={2} key={key}>
              <PokemonCard 
                name={pokemon.data.name}
                image={pokemon.data.sprites.front_default}
              />
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </div>
  )
}
