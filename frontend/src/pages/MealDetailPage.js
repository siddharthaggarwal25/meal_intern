import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import Error from '../components/Error';
import ApiService from '../services/ApiService';
import '../styles/MealDetailPage.css';

const MealDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await ApiService.getMealById(id);
        setMeal(result);
      } catch (err) {
        setError(err.message || 'Failed to load meal details');
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

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

  if (!meal) {
    return <Error message="Meal not found" />;
  }

  const getYoutubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const youtubeId = getYoutubeId(meal.youtube);

  return (
    <div className="meal-detail-page">
      <button className="back-button" onClick={() => navigate(-1)}> Back</button>

      <div className="meal-detail-container">
        <div className="meal-detail-image">
          <img src={meal.thumbnail} alt={meal.name} />
        </div>

        <div className="meal-detail-info">
          <div className="meal-detail-header">
            <h1>{meal.name}</h1>
            <div className="meal-meta">
              <span className="meal-category">{meal.category}</span>
              <span className="meal-area">{meal.area}</span>
            </div>
            {meal.tags && meal.tags.length > 0 && (
              <div className="meal-tags">
                {meal.tags.map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </div>

          <div className="meal-detail-section">
            <h2>Instructions</h2>
            <p className="meal-instructions">{meal.instructions}</p>
          </div>

          <div className="meal-detail-section">
            <h2>Ingredients</h2>
            <ul className="ingredients-list">
              {meal.ingredients && meal.ingredients.map((ing, idx) => (
                <li key={idx} className="ingredient-item">
                  <span className="ingredient-name">{ing.name}</span>
                  <span className="ingredient-measure">{ing.measure}</span>
                </li>
              ))}
            </ul>
          </div>

          {youtubeId && (
            <div className="meal-detail-section">
              <h2>Video Recipe</h2>
              <div className="video-container">
                <iframe
                  width="100%"
                  height="400"
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title={meal.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealDetailPage;
