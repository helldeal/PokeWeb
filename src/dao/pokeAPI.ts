export async function fetchPokemonData() {
    const apiUrl = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10000";
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  export async function fetchPokemonDataByUrl(apiUrl:any) {
    try {
      const response = await fetch(apiUrl);
    
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  export async function fetchPokemonDataById(id:any) {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/"+id);
    
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }