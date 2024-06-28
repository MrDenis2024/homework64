import './App.css';
import Toolbar from './components/Toolbar/Toolbar';
import {Route, Routes} from 'react-router-dom';
import PostsList from './containers/PostsList/PostsList';
import PostInfo from './containers/PostInfo/PostInfo';
import InteractionForm from './containers/InteractionForm/InteractionForm';
import About from './containers/About/About';

const App = () => (
  <>
    <header>
      <Toolbar />
    </header>
    <main className='container'>
      <Routes>
        <Route path='/' element={<PostsList />} />
        <Route path='/new-post' element={<InteractionForm />} />
        <Route path='/posts/:id' element={<PostInfo />} />
        <Route path='/posts/:id/edit' element={<InteractionForm />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </main>
  </>
);

export default App;
