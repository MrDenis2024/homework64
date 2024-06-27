import React from 'react';
import {ApiPost} from '../../types';

interface Props {
  post: ApiPost;
  onFieldChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFormSubmit: React.ChangeEventHandler<HTMLFormElement>;
}

const PostForm: React.FC<Props> = ({post, onFieldChange, onFormSubmit}) => {
  return (
    <div className="mt-4 border border-black rounded p-5">
      <h2>Add new post</h2>
      <form className="mt-4" onSubmit={onFormSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title" type="text" name="title"
            className="form-control" value={post.title} onChange={onFieldChange} required
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" rows={18} className='form-control'
                    value={post.description} onChange={onFieldChange} required></textarea>
        </div>
        <div className='text-end'>
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;