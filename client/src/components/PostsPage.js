import { useCallback, useEffect, useState } from 'react';
import PostActions from '../actions/PostActions';
import PostCard from './PostCard';

const PostsPage = (props) => {
  const { user } = props;
  const [posts, setPosts] = useState([]);

  const getPosts = useCallback(async () => {
    const { ok, rows, message } = await PostActions.getPosts();
    if (!ok) return alert(message);
    console.log(rows)
    setPosts(rows);
  }, []);

  // console.log(posts)

  useEffect(() => {
    getPosts();
    return () => {};
  }, [getPosts]);

  return (
    <div className="container">
      <h1>게시물 목록 페이지</h1>
      <div>
        {posts.map((post, key) => {
          const PostCardProps = { key, user, post };
          console.log(PostCardProps)
          return <PostCard {...PostCardProps} />;
        })}
      </div>
    </div>
  );
};

export default PostsPage;
