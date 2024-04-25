import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Forum.css';

function Forum() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5); // Number of posts per page
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false); // Track authentication state
  const history = useHistory(); // Initialize useHistory hook

  useEffect(() => {
    fetchPosts();
    checkAuthentication(); // Check authentication state when component mounts
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/posts?page=${currentPage}&limit=${postsPerPage}`);
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const checkAuthentication = () => {
    // Check if user is authenticated (e.g., using JWT token stored in localStorage)
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleCreatePost = async () => {
    // Check if user is authenticated before allowing to create post
    if (!authenticated) {
      // Redirect to login page if user is not authenticated
      history.push('/login');
      return;
    }
    // Proceed with creating post if user is authenticated
    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/posts/create', formData);
      fetchPosts();
      setFormData({ title: '', content: '' });
      setLoading(false);
    } catch (error) {
      console.error('Error creating post:', error);
      setLoading(false);
    }
  };
  

  return (
    <div className="forum-container">
      <h1>Forum</h1>
      {authenticated && (
        <form onSubmit={handleCreatePost}>
          <input 
            type="text" 
            placeholder="Title" 
            value={formData.title} 
            onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
            required 
          />
          <textarea 
            placeholder="Content" 
            value={formData.content} 
            onChange={(e) => setFormData({ ...formData, content: e.target.value })} 
            required 
          />
          <button type="submit" disabled={loading}>Create Post</button>
        </form>
      )}
      {!authenticated && <p>Please log in to create a post.</p>}
      {loading && <p>Loading...</p>}
      {!loading && posts.map((post) => (
        <div className="post" key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>Prev</button>
        <span>{currentPage}</span>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
}

export default Forum;
