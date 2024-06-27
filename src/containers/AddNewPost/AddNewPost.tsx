import React, {useState} from 'react';
import {ApiPost} from '../../types';
import PostForm from '../../components/PostForm/PostForm';
import axiosApi from '../../axiosApi';
import {useNavigate} from 'react-router-dom';

const AddNewPost = () => {
  const [newPost, setNewPost] = useState<ApiPost>({
    title: '',
    description: '',
    date: '',
  });
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

    const posts = {
      ...newPost,
      date: new Date(),
    };

    try {
      await axiosApi.post('/posts.json', posts);
    } finally {
      navigate('/');
    }
  };


  return (
    <div>
      <PostForm post={newPost} onFieldChange={(event) => onFieldChange(event)} onFormSubmit={onFormSubmit} />
    </div>
  );
};

export default AddNewPost;