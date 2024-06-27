import {NavLink} from 'react-router-dom';

const Toolbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid container">
        <NavLink to='/' className='navbar-brand'>My Blog</NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to='/' className='nav-link'>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/new-post' className='nav-link'>Add</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/about' className='nav-link'>About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/contacts' className='nav-link'>Contacts</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Toolbar;