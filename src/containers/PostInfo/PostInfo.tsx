import {useCallback, useEffect, useState} from 'react';
import {ApiPost} from '../../types';
import {Link, useNavigate, useParams} from 'react-router-dom';
import axiosApi from '../../axiosApi';
import DateFormat from '../../components/DateFormat/DateFormat';
import Spinner from '../../components/Spinner/Spinner';

const PostInfo = () => {
  const [post, setPost] = useState<ApiPost>({
    title: '',
    description: '',
    date: '',
  });
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  const navigate = useNavigate();

  const fetchOnePost = useCallback( async (id: string) => {
    setLoading(true);
    try {
      const response = await axiosApi.get<ApiPost | null>(`/posts/${id}.json`);

      if(response.data) {
        setPost(response.data);
      } else {
        navigate('/');
      }
    } finally {
      setLoading(false);
    }

  }, [navigate]);

  useEffect(() => {
    if(id !== undefined) {
      void fetchOnePost(id);
    }
  }, [id, fetchOnePost]);

  const deletePost = async () => {
    try {
      await axiosApi.delete(`/posts/${id}.json`);
    } finally {
      navigate('/');
    }
  };

  let postInfo = (
    <div className='border rounded p-4 mt-5'>
      <span>Publication date: {<DateFormat date={post.date} />}</span>
      <div>
        <p className='mt-3'>Title: <strong>{post.title}</strong></p>
        <p>Description:</p>
        <p className='border rounded p-4'>{post.description}</p>
      </div>
      <div className='text-end'>
        <Link to={`/posts/${id}/edit`} className='btn btn-success me-3'>Change</Link>
        <button type='button' className='btn btn-danger' onClick={deletePost}>Delete</button>
      </div>
    </div>
  );

  if(loading) {
    postInfo = (
      <div className="d-flex justify-content-center align-items-center" style={{height: '300px'}}>
        <Spinner/>
      </div>
    );
  }

  return (
    <>
      {postInfo}
    </>
  );
};

export default PostInfo;