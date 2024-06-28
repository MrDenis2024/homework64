import React, {useCallback, useEffect, useState} from 'react';
import {ApiUser} from '../../types';
import axiosApi from '../../axiosApi';
import {useNavigate} from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

const ChangeAbout = () => {
  const [changeUser, setChangeUser] = useState<ApiUser>({
    date: '',
    name: '',
    surname: '',
    image: '',
    gender: '',
  });
  const [loading, setLoading] = useState(false);
  const navigates = useNavigate();

  const fetchChangeUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosApi.get<ApiUser | null>(`/user.json`);

      if(response.data) {
        setChangeUser(response.data);
      }
    } catch (e){
      console.error('Ошибка получение данных о блогере');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchChangeUser();
  }, [fetchChangeUser]);

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = event.target;

    setChangeUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axiosApi.put('/user.json', changeUser);
    } catch (e) {
      console.error('Ошибка отпарвки данных о блогере');
    } finally {
      setLoading(false);
      navigates('/about');
    }
  };

  let form = (
    <div className="mt-4 border border-black rounded p-5">
      <h2>Change About</h2>
      <form className="mt-4" onSubmit={onFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name" type="text" name="name"
            className="form-control" value={changeUser.name} onChange={onFieldChange} required
          />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Surname</label>
          <input
            id="surname" type="text" name="surname"
            className="form-control" value={changeUser.surname} onChange={onFieldChange} required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Birthday</label>
          <input
            id="date" type="date" name="date"
            className="form-control" value={changeUser.date} onChange={onFieldChange} required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            id="image" type="text" name="image"
            className="form-control" value={changeUser.image} onChange={onFieldChange} required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender" name="gender"
            className="form-control" value={changeUser.gender} onChange={onFieldChange} required
          >
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>
        <div className='text-end'>
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </form>
    </div>
  );

  if(loading) {
    form = (
      <div className="d-flex justify-content-center align-items-center" style={{height: '300px'}}>
        <Spinner/>
      </div>
    );
  }

  return (
    <>
      {form}
    </>
  );
};

export default ChangeAbout;