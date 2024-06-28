import {useCallback, useEffect, useState} from 'react';
import axiosApi from '../../axiosApi';
import {ApiUser} from '../../types';
import Spinner from '../../components/Spinner/Spinner';

const About = () => {
  const [user, setUser] = useState<ApiUser>({
    date: '',
    name: '',
    surname: '',
    image: '',
    gender: '',
  });
  const [loading, setLoading] = useState(false);
  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosApi.get<ApiUser | null>(`/user.json`);
      console.log(response);

      if(response.data) {
        setUser(response.data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchUser();
  }, [fetchUser]);

  let about = (
    <div className='mt-5 border rounded p-3'>
      <h2 className='text-center'>About blogger</h2>
      <div className='d-flex mt-5 mb-3'>
        <div className='d-flex flex-column align-self-center col-8 text-center'>
          <p>Name: <strong>{user.name}</strong></p>
          <p>Surname: <strong>{user.surname}</strong></p>
          <p>Date: <strong>{user.date}</strong></p>
          <p>Gender: <strong>{user.gender}</strong></p>
        </div>
        <div className='col-4'>
          <img className='w-50 rounded-5' src={user.image} alt={user.name}/>
        </div>
      </div>
    </div>
  );

  if (loading) {
    about = (
      <div className="d-flex justify-content-center align-items-center" style={{height: '300px'}}>
        <Spinner/>
      </div>
    );
  }

  return (
    <>
      {about}
    </>
  );
};

export default About;