import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MealCard from '../components/MealCard';
import Loading from '../components/Loading';
import Error from '../components/Error';
import ApiService from '../services/ApiService';
import '../styles/CategoryMealsPage.css';

const CategoryMealsPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [meals, setMeals] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      setError(null);

      try {
        const results = await ApiService.getMealsByCategory(category);
        setMeals(results);
      } catch (err) {
        setError(err.message || 'Failed to load meals');
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [category]);

  const handleMealClick = (mealId) => {
    navigate(`/meal/${mealId}`);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Error 
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="category-meals-page">
      <div className="category-header">
        <button className="back-button" onClick={() => navigate(-1)}> Back</button>
        <h1>{category} Meals</h1>
        <p>Found {meals?.length || 0} delicious {category} recipes</p>
      </div>

      <div className="meals-grid">
        {meals && meals.map(meal => (
          <MealCard
            key={meal.id}
            meal={meal}
            onClick={() => handleMealClick(meal.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryMealsPage;
