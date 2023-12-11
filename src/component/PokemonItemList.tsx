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
              src={pokemonDetails.sprites.front_default}
              alt={pokemonDetails.name}
            />
          </div>
          <div className="text-center">{pokemonDetails.id}</div>
          <div className="text-center">{pokemonDetails.name}</div>
          <div className="items-center justify-around">
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
