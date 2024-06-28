import React, {useCallback, useEffect, useState} from 'react';
import {ApiPost} from '../../types';
import PostForm from '../../components/PostForm/PostForm';
import axiosApi from '../../axiosApi';
import {useNavigate, useParams} from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

const initialState = {
  title: '',
  description: '',
  date: '',
};

const InteractionForm = () => {
  const [post, setPost] = useState<ApiPost>(initialState);
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const navigates = useNavigate();

  const fetchOnePost = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const response = await axiosApi.get<ApiPost | null>(`/posts/${id}.json`);

      if(response.data) {
        setPost(response.data);
      } else {
        navigates('/');
      }
    } finally {
      setLoading(false);
    }
  }, [navigates]);

  useEffect(() => {
    if(id !== undefined) {
      void fetchOnePost(id);
    } else {
      setPost(initialState);
    }
  }, [id, fetchOnePost]);

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;

    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const posts = {
      ...post,
      date: new Date(),
    };

    if(id !== undefined) {
      try {
        await axiosApi.put(`/posts/${id}.json`, post);
      } finally {
        setLoading(false);
        navigates('/');
      }
    } else {
      try {
        await axiosApi.post('/posts.json', posts);
      } finally {
        setLoading(false);
        navigates('/');
      }
    }
  };

  let form = (
    <PostForm id={id} post={post} onFieldChange={(event) => onFieldChange(event)} onFormSubmit={onFormSubmit} />
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

export default InteractionForm;