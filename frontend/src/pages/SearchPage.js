import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import MealCard from '../components/MealCard';
import Loading from '../components/Loading';
import Error from '../components/Error';
import ApiService from '../services/ApiService';
import '../styles/SearchPage.css';

const SearchPage = () => {
  const navigate = useNavigate();
  const [meals, setMeals] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const results = await ApiService.searchMeals(query);
      setMeals(results);
    } catch (err) {
      setError(err.message || 'Failed to search meals');
      setMeals(null);
    } finally {
      setLoading(false);
    }
  };

  const handleMealClick = (mealId) => {
    navigate(`/meal/${mealId}`);
  };

  return (
    <div className="search-page">
      <div className="search-hero">
        <h1>Find Your Favorite Meal</h1>
        <p>Search for meals by name and explore delicious recipes</p>
        <SearchBar onSearch={handleSearch} placeholder="Search for pasta, pizza, chicken..." />
      </div>

      {loading && <Loading />}

      {error && (
        <Error 
          message={error} 
          onRetry={() => setSearched(false)}
        />
      )}

      {searched && !loading && !error && (
        <div className="search-results">
          {meals && meals.length > 0 ? (
            <>
              <h2>Results ({meals.length})</h2>
              <div className="meals-grid">
                {meals.map(meal => (
                  <MealCard
                    key={meal.id}
                    meal={meal}
                    onClick={() => handleMealClick(meal.id)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="no-results">
              <p>No meals found. Try a different search</p>
            </div>
          )}
        </div>
      )}

      {!searched && !loading && (
        <div className="search-placeholder">
          <p>Start searching to discover amazing meals</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
