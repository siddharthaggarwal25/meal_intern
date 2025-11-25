import { useNavigate } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import Loading from '../components/Loading';
import Error from '../components/Error';
import ApiService from '../services/ApiService';
import { useAsync } from '../hooks/useAsync';
import '../styles/CategoriesPage.css';

const CategoriesPage = () => {
  const navigate = useNavigate();
  const { data: categories, status, error, execute } = useAsync(
    () => ApiService.getCategories(),
    true
  );

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };

  if (status === 'pending') {
    return <Loading />;
  }

  if (status === 'error') {
    return (
      <Error 
        message={error?.message || 'Failed to load categories'}
        onRetry={execute}
      />
    );
  }

  return (
    <div className="categories-page">
      <div className="categories-header">
        <h1>Food Categories</h1>
        <p>Browse meals by category and find your next favorite dish</p>
      </div>

      <div className="categories-grid">
        {categories && categories.map(category => (
          <CategoryCard
            key={category.id}
            category={category}
            onClick={() => handleCategoryClick(category.name)}
          />
        ))}
      </div>
    </div>
  );
};


export default CategoriesPage;
