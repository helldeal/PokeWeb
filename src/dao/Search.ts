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
  
  export function searchPokemons(pokemons:any,inputText: string, maxResults = 20) {
    if(inputText=="")return pokemons.slice(0,maxResults)
    return findMostAccuratePokemons(pokemons, inputText).slice(0, maxResults);
  }