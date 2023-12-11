import { useState, useEffect } from "react";
import { fetchPokemonData } from "./dao/pokeAPI";
import PokemonListItem from "./component/PokemonItemList";
import { searchPokemons } from "./dao/Search";
import './App.css'

function App() {
  const [allPokemonData, setAllPokemonData] = useState<any>([]);
  const [pokemonData, setPokemonData] = useState<any>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchPokemonData();
        setPokemonData(data.slice(0,20));
        setAllPokemonData(data);
      } catch (error) {
        console.error(`Error fetching details for pokemons:`, error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const newData = searchPokemons(allPokemonData,search);
    setPokemonData(newData);
  }, [search]);
  return (
      <div className="bg-gray-100 py-10 rounded-2xl">
        <div className=" mx-40 p-4 flex flex-col justify-center items-center gap-4">
          <h1 className="text-3xl font-bold text-center">PokéWeb</h1>
          <input
            className="w-full lg:w-80 px-4 py-2 text-sm text-center border rounded-full shadow-xl border-slate-200 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Saisissez un pokémon"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {pokemonData ? (
            pokemonData.length > 0 ? (
              <table className="mt-8 w-full">
                <thead>
                  <tr>
                    <th className="text-center">Image</th>
                    <th className="text-center">Nom</th>
                    <th className="text-center">Type</th>
                    <th className="text-center">Numéro</th>
                    <th className="text-center">PV</th>
                    <th className="text-center">Attaque</th>
                    <th className="text-center">Défense</th>
                    <th className="text-center">Attaque Spé</th>
                    <th className="text-center">Défense Spé</th>
                    <th className="text-center">Vitesse</th>
                  </tr>
                </thead>
                <tbody>
                  {pokemonData.map((pokemon: any, index: number) => (
                    <PokemonListItem key={index} pokemon={pokemon} />
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Aucun Pokémon trouvé</p>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

  );
}

export default App;
