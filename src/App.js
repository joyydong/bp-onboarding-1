import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {
  const APP_ID = "0cc96450";
  const APP_KEY = "14d029aed46efe535cde32ea66599608";

  const [recipes, setRecipes] = useState([]); // recipes to display, initially set to empty array
  const [search, setSearch] = useState(' '); // search state
  const [query, setQuery] = useState('chicken'); // search terms we are querying by

  useEffect( () => {
    const getRecipes = async () => {
      // can also use .then
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`); // external request
      const data = await response.json(); // need to wait for response to come 
      setRecipes(data.hits);
      console.log(data.hits);
    };
    getRecipes();
  }, [query]); // only runs when we click submit bc that's the only time query will change

  

  const updateSearch = e => { // e for event
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault(); // stop page refresh so we don't call the API on every keystroke
    setQuery(search);
    setSearch(''); // clear search bar
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form"> {/* update query and search (getSearch) only after pressing submit */}
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe 
            key={recipe.recipe.label} // Each child in a list should have a unique "key" prop
            title={recipe.recipe.label} 
            calories={Math.round(recipe.recipe.calories)} 
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  )
}

export default App;
