import { useState, useEffect } from "react";
import { fetchPokemonData } from "./dao/pokeAPI";
import PokemonListItem from "./component/PokemonItemList";
import { searchPokemons } from "./dao/Search";
import "./App.css";

function App() {
  const [allPokemonData, setAllPokemonData] = useState<any>([]);
  const [pokemonData, setPokemonData] = useState<any>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchPokemonData();
        setPokemonData(data.slice(0, 20));
        setAllPokemonData(data.slice(0, 1017));
      } catch (error) {
        console.error(`Error fetching details for pokemons:`, error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const newData = searchPokemons(allPokemonData, search);
    setPokemonData(newData);
  }, [search]);
  return (
    <div className="py-10">
      <div className=" p-4 flex flex-col justify-center items-center gap-10">
        <h1 className="text-3xl font-bold text-center">PokéWeb</h1>
        <input
          className="w-full lg:w-80 px-4 py-2 text-sm text-center border rounded-full shadow-xl border-slate-200 focus:outline-none focus:ring focus:border-blue-300 text-black"
          placeholder="Saisissez un pokémon"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex flex-wrap w-full justify-center">
          {pokemonData ? (
            pokemonData.length > 0 ? (
              pokemonData.map((pokemon: any, index: number) => (
                <PokemonListItem key={index} pokemon={pokemon}/>
              ))
            ) : (
              <p>Aucun Pokémon trouvé</p>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
