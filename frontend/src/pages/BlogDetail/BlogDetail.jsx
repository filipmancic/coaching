// BlogDetail.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './BlogDetail.css'
import Footer from '../../components/Footer/Footer';

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blog/blog/${slug}`);
        setBlog(response.data.blog);
      } catch (err) {
        console.error('Error fetching blog detail:', err);
        setError('Blog not found');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
    <div className="blog-info">
    <div className="blog-detail">
      <h1>{blog.title}</h1>
      <h4>Autor: Vanja Selmović - Čupavi Trener</h4>
      <p dangerouslySetInnerHTML={{ __html: blog.blog_text }} style={{ marginTop: '20px' }}></p>
      {blog.image && <img src={blog.image} alt={blog.title} style={{ maxWidth: '100%' }} />}
    </div>
    </div>
    <Footer/>
    </div>
  );
}
