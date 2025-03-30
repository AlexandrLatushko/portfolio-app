import { Provider } from 'react-redux';
import { store } from './store/store';
import PortfolioOverview from './components/PortfolioOverview';
import './styles/PortfolioOverview.module.scss';

function App() {
  return (
    <Provider store={store}>
      <PortfolioOverview />
    </Provider>
  );
}

export default App;