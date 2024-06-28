import {useCallback, useEffect, useState} from 'react';
import axiosApi from '../../axiosApi';
import {ApiPosts, Post} from '../../types';
import GetPost from '../../components/GetPost/GetPost';
import Spinner from '../../components/Spinner/Spinner';

const PostsList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchPosts = useCallback( async () => {
    setLoading(true);
    try {
      const response = await axiosApi.get<ApiPosts | null>('/posts.json');
      const postsResponse = response.data;

      if(postsResponse !== null) {
        const posts: Post[] = Object.keys(postsResponse).reverse().map((id: string) => {
          return {
            ...postsResponse[id],
            id,
          };
        });
        setPosts(posts);
      } else {
        setPosts([]);
      }
    } catch (e) {
      console.error('Ошибка получение данных о постах');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);

  let postsList = (
    <div className="mt-5">
      {posts.length > 0 ? <>{posts.map((post) => (
        <GetPost key={post.id} post={post}/>
      ))}</> : <h3 className='text-center'>No posts, add a new post</h3>}
    </div>
  );

  if (loading) {
    postsList = (
      <div className="d-flex justify-content-center align-items-center" style={{height: '300px'}}>
        <Spinner/>
      </div>
    );
  }

  return (
    <>
      {postsList}
    </>
  );
};

export default PostsList;