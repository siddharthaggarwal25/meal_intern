
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryMealsPage from './pages/CategoryMealsPage';
import MealDetailPage from './pages/MealDetailPage';
import RandomMealPage from './pages/RandomMealPage';
import './styles/index.css';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/category/:category" element={<CategoryMealsPage />} />
          <Route path="/meal/:id" element={<MealDetailPage />} />
          <Route path="/random" element={<RandomMealPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
