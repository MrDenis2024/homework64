import './App.css';
import Toolbar from './components/Toolbar/Toolbar';
import {Route, Routes} from 'react-router-dom';
import AddNewPost from './containers/AddNewPost/AddNewPost';

const App = () => (
  <>
    <header>
      <Toolbar />
    </header>
    <main className='container'>
      <Routes>
        <Route path='/new-post' element={<AddNewPost />} />
      </Routes>
    </main>
  </>
);

export default App;
