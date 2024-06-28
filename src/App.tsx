import './App.css';
import Toolbar from './components/Toolbar/Toolbar';
import {Route, Routes} from 'react-router-dom';
import PostsList from './containers/PostsList/PostsList';
import PostInfo from './containers/PostInfo/PostInfo';
import InteractionForm from './containers/InteractionForm/InteractionForm';
import About from './containers/About/About';
import Contacts from './containers/Contacts/Contacts';
import ChangeAbout from './containers/ChangeAbout/ChangeAbout';

const App = () => (
  <>
    <header>
      <Toolbar />
    </header>
    <main className='container flex-grow-1'>
      <Routes>
        <Route path='/' element={<PostsList />} />
        <Route path='/new-post' element={<InteractionForm />} />
        <Route path='/posts/:id' element={<PostInfo />} />
        <Route path='/posts/:id/edit' element={<InteractionForm />} />
        <Route path='/about' element={<About />} />
        <Route path='/about/edit' element={<ChangeAbout />} />
        <Route path='/contacts' element={<Contacts />} />
        <Route path='*' element={<div className="text-center mt-5"><strong>Данной страницы не найдено вернитесь
          пожалуйста обратно!</strong></div>} />
      </Routes>
    </main>
    <footer className="bg-success">
      <div className="container text-center">
        <p className='my-4 text-light'>Made by Denis Khrunev student Attractor school 2024</p>
      </div>
    </footer>
  </>
);

export default App;
