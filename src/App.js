import React, { useState, useEffect } from "react";
// import styled from "styled-components";
import "./App.css";
import axios from "axios";
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";
const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
      setLoading(false);
    };
    fetchPosts();
  }, []);
  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
  }
  // console.log(posts)
  //GET CURRENT POST
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  return (
    <div className="container">
      <h1 className="text-primary">My Fetched Blogs</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        paginate={paginate}
        totalPosts={posts.length}
      />
    </div>
  );
};
export default App;
