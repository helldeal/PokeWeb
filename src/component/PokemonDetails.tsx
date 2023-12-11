// PokemonDetail.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPokemonDataById } from "../dao/pokeAPI";

function PokemonDetail() {
  const { pokemonId } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState<any>(null);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const details = await fetchPokemonDataById(pokemonId);
        setPokemonDetails(details);
      } catch (error) {
        console.error(`Error fetching details for ${pokemonId}:`, error);
      }
    }

    fetchDetails();
  }, [pokemonId]);

  if (!pokemonDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="pokemon-details max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-md bg-white">
      <h1 className="text-3xl font-semibold mb-4">{pokemonDetails.name}</h1>
      <img
        src={pokemonDetails.sprites.front_default}
        alt={pokemonDetails.name}
        className="mx-auto mb-4"
        style={{ maxWidth: '200px', maxHeight: '200px' }}
      />
      <p className="text-lg">Height: {pokemonDetails.height / 10} m</p>
      <p className="text-lg">Weight: {pokemonDetails.weight / 10} kg</p>
      <p className="text-lg">Type(s): {pokemonDetails.types.map((type:any) => type.type.name).join(', ')}</p>
      <p className="text-lg">Base Experience: {pokemonDetails.base_experience}</p>
      <p className="text-lg">Species: {pokemonDetails.species.name}</p>
      <p className="text-lg">ID: {pokemonDetails.id}</p>
      <p className="text-lg">Order: {pokemonDetails.order}</p>
      <p className="text-lg">Is Default: {pokemonDetails.is_default.toString()}</p>
      <p className="text-lg">Held Items: {pokemonDetails.held_items.map((item:any) => item.item.name).join(', ')}</p>
      <p className="text-lg">Stats:</p>
      <ul className="list-disc ml-6">
        {pokemonDetails.stats.map((stat:any) => (
          <li key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
      <p className="text-lg">Abilities:</p>
      <ul className="list-disc ml-6">
        {pokemonDetails.abilities.map((ability:any, index:number) => (
          <li key={index}>{ability.ability.name}</li>
        ))}
      </ul>
      {/* <p className="text-lg">Moves:</p>
      <ul className="list-disc ml-6">
        {pokemonDetails.moves.map((move:any, index:number) => (
          <li key={index}>{move.move.name}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default PokemonDetail;
