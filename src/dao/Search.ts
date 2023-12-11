import { pokeAll } from "./pokeAPI";

function findMostAccuratePokemons(pokemons: any[], search: string) {
    const scores = pokemons.map((pokemon) => {
      const name = pokemon.name.toLowerCase();
      const s = search.toLowerCase();
      const index = name.indexOf(s);
      if (index === -1) {
        return 0;
      } else if (index === 0) {
        return s.length / name.length;
      } else {
        return s.length / (name.length + index);
      }
    });
    
    const pokeScore = pokemons.map((pokemon, index: number) => {
      return {
        name:pokemon.name,
        url:pokemon.url,
        score: scores[index],
      };
    });
    const sortedPokemons = pokeScore.sort(
      (a: { score: number }, b: { score: number }) => b.score - a.score
    );
    return sortedPokemons.filter(pokemon=>pokemon.score>0)
  }
  
  export function searchPokemons(inputText: string, maxResults = 50) {
    const pokemons = pokeAll;
    // Calcul de la distance pour chaque médicament et tri par proximité
    return findMostAccuratePokemons(pokemons, inputText).slice(0, maxResults);
  }