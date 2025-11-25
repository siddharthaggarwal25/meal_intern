
import '../styles/MealCard.css';

const MealCard = ({ meal, onClick }) => {
  return (
    <div className="meal-card" onClick={onClick}>
      <img src={meal.thumbnail} alt={meal.name} className="meal-card-image" />
      <div className="meal-card-content">
        <h3 className="meal-card-title">{meal.name}</h3>
        {meal.category && <p className="meal-card-category">{meal.category}</p>}
      </div>
    </div>
  );
};

export default MealCard;
