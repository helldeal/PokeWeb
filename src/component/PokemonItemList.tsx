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

  if (!pokemonDetails || pokemonDetails.sprites.front_default == undefined) {
    return null;
  }
  return (
    <div className=" w-1/4 fit">
      <Link to={`/PokeWeb/pokemon/${pokemonDetails.id}`}>
        <div className="pokemonItemCard">
          <div className="flex items-center justify-center">
            <img
            className="absolute w-2/3 top-12"
              src={pokemonDetails.sprites.front_default}
              alt={pokemonDetails.name}
            />
          </div>
          <div className="text-[#b4ebff] text-xl w-4/5 left-[10%] top-[57%] absolute">{pokemonDetails.id.toString().padStart(4, '0')}</div>
          <div className="text-2xl w-4/5 left-[10%] top-[63%] absolute">{pokemonDetails.name.charAt(0).toUpperCase()+pokemonDetails.name.slice(1)}</div>
          <div className="w-full flex items-center justify-center absolute bottom-12">
          {pokemonDetails.types.map((type: any) => (
            <img
              src={`https://play.pokemonshowdown.com/sprites/types/${
                type.type.name.charAt(0).toUpperCase() +
                type.type.name.slice(1)
              }.png`}
              alt={type.type.name}
              key={type.type.name}
            />
          ))}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PokemonListItem;
