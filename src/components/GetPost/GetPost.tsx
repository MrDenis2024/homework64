import React from 'react';
import {Post} from '../../types';
import {Link} from 'react-router-dom';
import DateFormat from '../DateFormat/DateFormat';

interface Props {
  post: Post;
}

const GetPost: React.FC<Props> = ({post}) => {
  return (
    <div className='border rounded p-3 mb-3'>
      <p>Created on: {<DateFormat date={post.date}/>}</p>
      <p><strong>{post.title}</strong></p>
      <Link to={`/posts/${post.id}`} className='btn btn-success'>Learn more</Link>
    </div>
  );
};

export default GetPost;