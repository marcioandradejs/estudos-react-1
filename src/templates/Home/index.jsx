import { useEffect, useState, useCallback } from 'react';

import './styles.css';

import Posts from '../../components/Posts/Posts';
import { loadPosts } from '../../functions/load-posts';
import { Button } from '../../components/Button/Button';
import TextInput from '../../components/TextInput/TextInput';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <section className="container">
      <div className="search-container">
        <TextInput searchValue={searchValue} handleChange={handleChange} />
        {!!searchValue && <h1>searchValue: {searchValue}</h1>}
      </div>
      {filteredPosts.length > 0 ? <Posts posts={filteredPosts} /> : <p>Não existem posts =(</p>}
      {!searchValue && (
        <div className="button-container">
          <Button disabled={noMorePosts} text="Load more posts" onClick={loadMorePosts} />
        </div>
      )}
    </section>
  );
};

export default Home;
