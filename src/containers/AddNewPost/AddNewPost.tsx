import React, {useState} from 'react';
import {ApiPost} from '../../types';
import PostForm from '../../components/PostForm/PostForm';
import axiosApi from '../../axiosApi';
import {useNavigate} from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

const AddNewPost = () => {
  const [newPost, setNewPost] = useState<ApiPost>({
    title: '',
    description: '',
    date: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;

    setNewPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const posts = {
      ...newPost,
      date: new Date(),
    };

    try {
      await axiosApi.post('/posts.json', posts);
    } finally {
      setLoading(false);
      navigate('/');
    }
  };

  let form = (
    <PostForm post={newPost} onFieldChange={(event) => onFieldChange(event)} onFormSubmit={onFormSubmit} />
  );

  if(loading) {
    form = (
      <div className='d-flex justify-content-center align-items-center' style={{height: '300px'}}>
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      {form}
    </div>
  );
};

export default AddNewPost;