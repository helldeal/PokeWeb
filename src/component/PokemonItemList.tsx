import { useState, useEffect } from "react";
import { fetchPokemonDataByUrl } from "../dao/pokeAPI";
import { Link } from "react-router-dom";

function PokemonListItem({ pokemon }: any) {
  const [pokemonDetails, setPokemonDetails] = useState<any>(null);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const details = await fetchPokemonDataByUrl(pokemon.url);
        setPokemonDetails(details);
      } catch (error) {
        console.error(`Error fetching details for ${pokemon.name}:`, error);
      }
    }

    fetchDetails();
  }, [pokemon]);

  if (!pokemonDetails||pokemonDetails.sprites.front_default==undefined) {
    return null;
  }
  return (
    <tr>
      <td className="flex items-center justify-center">
        <Link to={`/PokeWeb/pokemon/${pokemonDetails.id}`}>
        <img
          src={pokemonDetails.sprites.front_default}
          alt={pokemonDetails.name}
        /></Link>
      </td>
      <td className="text-center">
        <Link to={`/PokeWeb/pokemon/${pokemonDetails.id}`}>{pokemonDetails.name}</Link>
      </td>
      <td className="text-center">
        {pokemonDetails.types.map((type: any) => type.type.name + " ")}
      </td>
      <td className="text-center">{pokemonDetails.id}</td>
      <td className="text-center">{pokemonDetails.stats[0].base_stat}</td>
      <td className="text-center">{pokemonDetails.stats[1].base_stat}</td>
      <td className="text-center">{pokemonDetails.stats[2].base_stat}</td>
      <td className="text-center">{pokemonDetails.stats[3].base_stat}</td>
      <td className="text-center">{pokemonDetails.stats[4].base_stat}</td>
      <td className="text-center">{pokemonDetails.stats[5].base_stat}</td>
    </tr>
  );
}

export default PokemonListItem;
