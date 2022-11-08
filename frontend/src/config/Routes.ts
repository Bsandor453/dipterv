import AdminBoard from '../pages/AdminBoard';
import CryptocurrenciesPage from '../pages/Cryptocurrencies';
import CryptocurrencyDetailsPage from '../pages/CryptocurrencyDetails';
import HomePage from '../pages/Home';
import IRoute from '../interfaces/IRoute';
import LoginPage from '../pages/Login';
import LogoutPage from '../pages/Logout';
import NotFoundPage from '../pages/NotFound';
import ProfilePage from '../pages/Profile';
import RegisterPage from '../pages/Register';
import SummaryPage from '../pages/SummaryPage';
import TransactionHistoryPage from '../pages/TransactionHistory';
import UserBoard from '../pages/UserBoard';
import WalletPage from '../pages/Wallet';

const routes: IRoute[] = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    exact: true,
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    exact: true,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    exact: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    exact: true,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: LogoutPage,
    exact: true,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
    exact: true,
  },
  {
    path: '/user',
    name: 'UserBoard',
    component: UserBoard,
    exact: true,
  },
  {
    path: '/admin',
    name: 'AdminBoard',
    component: AdminBoard,
    exact: true,
  },
  {
    path: '/summary',
    name: 'Summary',
    component: SummaryPage,
    exact: true,
  },
  {
    path: '/cryptocurrencies',
    name: 'Cryptocurrencies',
    component: CryptocurrenciesPage,
    exact: true,
  },
  {
    path: '/cryptocurrencies/:number',
    name: 'CryptocurrencyDetails',
    component: CryptocurrencyDetailsPage,
    exact: true,
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: WalletPage,
    exact: true,
  },
  {
    path: '/history',
    name: 'TransactionHistory',
    component: TransactionHistoryPage,
    exact: true,
  },
  {
    path: '',
    name: 'Not found',
    component: NotFoundPage,
    exact: false,
  },
];

export default routes;
