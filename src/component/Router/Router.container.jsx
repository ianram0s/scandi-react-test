import { PureComponent } from 'react';
import {
  BrowserRouter, Route, Routes, useParams,
} from 'react-router-dom';
import ProductDescriptionPage from '../../route/ProductDescriptionPage';
import ProductListPage from '../../route/ProductListPage';
import CartPage from '../../route/CartPage';
import HeaderContainer from '../Header/Header.container';

function ProductListPageWrapper() {
  const params = useParams();
  return (
    <ProductListPage
      key={params.category}
      categoryFromURL={params.category.toLowerCase()}
    />
  );
}
function ProductDescriptionPageWrapper() {
  const params = useParams();
  return (
    <ProductDescriptionPage
      key={params.productid}
      categoryFromURL={params.category.toLowerCase()}
      productidFromURL={params.productid.toLowerCase()}
    />
  );
}

class Router extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <HeaderContainer />
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route exact path="/:category" element={<ProductListPageWrapper />} />
          <Route exact path="/:category/:productid" element={<ProductDescriptionPageWrapper />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default Router;
