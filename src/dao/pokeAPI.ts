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
      const responseSpecies = await fetch("https://pokeapi.co/api/v2/pokemon-species/"+id);
    
      if (!response.ok||!responseSpecies.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const dataSpecies = await responseSpecies.json();   
       const mergedData = {
        ...data, // Spread the properties from the first response
        speciesData: dataSpecies, // Add a property for the second response
      };
  
      return mergedData;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }