import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppContainer from './components/containers/AppContainer'
import Navbar from './components/navbar/Navbar'
import ProductsPage from './pages/Products'
import HomePage from './pages/Home'
import Details from './pages/Details'
import { CartProvider } from './store/CartContext'
import Login from './pages/Login'
import AnimationProvider from './store/AnimationContext'
import Calculator from './pages/Calculator'
import SurvivalKits from './pages/SurvivalKits'
import SignUp from './pages/SignUp'
import UserProvider from './store/UserContext'
const App = () => {
  return (
    <UserProvider>
      <CartProvider>
        <AnimationProvider>
          <BrowserRouter>
            <AppContainer>
              <Navbar />
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/products/:category' element={<ProductsPage />} />
                <Route path='/products/details/:_id' element={<Details />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/calculator' element={<Calculator />} />
                <Route path='/survivalKits' element={<SurvivalKits />} />
              </Routes>
            </AppContainer>
          </BrowserRouter>
        </AnimationProvider>
      </CartProvider>
    </UserProvider>
  )
}
export default App
