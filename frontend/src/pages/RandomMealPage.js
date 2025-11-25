import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import Error from '../components/Error';
import ApiService from '../services/ApiService';
import '../styles/RandomMealPage.css';

const RandomMealPage = () => {
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRandomMeal = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await ApiService.getRandomMeal();
      setMeal(result);
    } catch (err) {
      setError(err.message || 'Failed to fetch random meal');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomMeal();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Error 
        message={error}
        onRetry={fetchRandomMeal}
      />
    );
  }

  if (!meal) {
    return <Error message="Meal not found" />;
  }

  const handleViewRecipe = () => {
    navigate(`/meal/${meal.id}`);
  };

  return (
    <div className="random-meal-page">
      <div className="random-meal-container">
        <h1>🎲 Random Meal of the Day</h1>
        
        <div className="random-meal-card">
          <img src={meal.thumbnail} alt={meal.name} className="random-meal-image" />
          
          <div className="random-meal-info">
            <h2>{meal.name}</h2>
            
            <div className="random-meal-meta">
              <div className="meta-item">
                <span className="meta-label">Category:</span>
                <span className="meta-value">{meal.category}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Cuisine:</span>
                <span className="meta-value">{meal.area}</span>
              </div>
            </div>

            <div className="random-meal-description">
              <p>{meal.instructions.substring(0, 300)}...</p>
            </div>

            <div className="random-meal-actions">
              <button className="btn-view-recipe" onClick={handleViewRecipe}>
                View Full Recipe
              </button>
              <button className="btn-new-random" onClick={fetchRandomMeal}>
                Get Another
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomMealPage;
