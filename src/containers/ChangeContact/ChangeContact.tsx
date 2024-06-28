import React, {useCallback, useEffect, useState} from 'react';
import {ApiContacts, MutationContacts} from '../../types';
import {useNavigate} from 'react-router-dom';
import axiosApi from '../../axiosApi';
import Spinner from '../../components/Spinner/Spinner';

const ChangeContact = () => {
  const [changeContact, setChangeContact] = useState<MutationContacts>({
    phone: '',
    address: '',
    email: '',
    gmail: '',
  });
  const [loading, setLoading] = useState(false);
  const navigates = useNavigate();

  const fetchChangeContact = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosApi.get<ApiContacts | null>(`/contacts.json`);

      if(response.data) {
        setChangeContact({
          ...response.data,
          phone: response.data.phone.toString(),
        });
      }
    } catch (e){
      console.error('Ошибка получение данных о контактах');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchChangeContact();
  }, [fetchChangeContact]);

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setChangeContact((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const contact = {
      ...changeContact,
      phone: parseFloat(changeContact.phone)
    };

    try {
      await axiosApi.put('/contacts.json', contact);
    } catch (e) {
      console.error('Ошибка отпарвки данных о контактах');
    } finally {
      setLoading(false);
      navigates('/contacts');
    }
  };

  let form = (
    <div className="mt-4 border border-black rounded p-5">
      <h2>Change Contact</h2>
      <form className="mt-4" onSubmit={onFormSubmit}>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            id="address" type="text" name="address"
            className="form-control" value={changeContact.address} onChange={onFieldChange} required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email" type="email" name="email"
            className="form-control" value={changeContact.email} onChange={onFieldChange} required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gmail">Gmail</label>
          <input
            id="gmail" type="email" name="gmail"
            className="form-control" value={changeContact.gmail} onChange={onFieldChange} required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone" type="number" name="phone"
            className="form-control" value={changeContact.phone} onChange={onFieldChange} required
          />
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

export default ChangeContact;