import React, { useEffect } from 'react';
import Slider from '../../components/Slider/Slider';
import Category from '../../components/Category/Category';
import ProductList from '../../components/ProductList/ProductList';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCategories,
  fetchProductByCategory,
} from '../../store/categorySlice';
import { fetchProducts } from '../../store/productSlice';
import './HomePage.scss';
import SingleCategory from '../../components/SingleCategory/SingleCategory';

function HomePage() {
  const dispatch = useDispatch();
  const { data: categories, status: categoryStatus } = useSelector(
    (state) => state.category
  );
  const { catProductAll: productsByCategory, catProductAllStatus } =
    useSelector((state) => state.category);
  const { data: products, status: productStatus } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchProductByCategory(1, 'all'));
    dispatch(fetchProductByCategory(2, 'all'));
  }, []);

  return (
    <div className="home-page">
      <Slider />
      <Category categories={categories} status={categoryStatus} />
      <ProductList products={products} status={productStatus} />
      {/* category one products */}
      <section>
        {productsByCategory[0] && (
          <SingleCategory
            products={productsByCategory[0]}
            status={catProductAllStatus}
          />
        )}
      </section>
      {/* category two products */}
      <section>
        {productsByCategory[1] && (
          <SingleCategory
            products={productsByCategory[1]}
            status={catProductAllStatus}
          />
        )}
      </section>
    </div>
  );
}

export default HomePage;
