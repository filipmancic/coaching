// BlogList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Blog.css'
import Footer from '../../components/Footer/Footer';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 6;

  useEffect(() => {
    fetchBlogs();
  }, [offset]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/blog/blogs?offset=${offset}&limit=${limit}`);
      if (offset === 0) {
        setBlogs(response.data.blogs);
      } else {
        setBlogs(prev => [...prev, ...response.data.blogs]);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const loadMore = () => {
    setOffset(offset + limit);
  };

  return (
    <div>
    <div className="blog-page">
      <h1>Vanjin blog</h1>
      <p className='uvod'>Dobrodošli na Vanjin blog – mesto gde se spajaju najnoviji saveti o treningu, vežbama, ishrani i zdravom životu. Ovde ćete pronaći inspiraciju i praktične informacije iz sveta teretane, istraživanja i savremenog fitnessa. Uživajte u čitanju i budite motivisani za postizanje svojih ciljeva!</p>
    <div className="blog-list">
      {blogs.map(blog => (
        <div key={blog.id} className="blog-preview">
          <Link to={`/blog/${blog.title.toLowerCase().replace(/\s+/g, '-')}`}>
            <h2>{blog.title}</h2>
          </Link>
          <p>{blog.preview_text}</p>
          {blog.image && <img src={blog.image} alt={blog.title} />}
          <Link to={`/blog/${blog.title.toLowerCase().replace(/\s+/g, '-')}`}><button className="button">Procitaj više</button></Link>
        </div>
      ))}
    </div>
      <button onClick={loadMore} className='button'>Učitaj još</button>
    </div>
      <Footer/>
    </div>
  );
}
