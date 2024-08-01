
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "./BlogList.css";

function BlogList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
    } else {
      axios
        .get("http://localhost:5000/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching posts", error);
        });
    }
  }, [navigate]);
  return (
    <div>
      <h3>Blog Posts</h3>
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        <div className="row">
          {posts.map((post) => (
            <div className="col-md-4 mb-4" key={post._id}>
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <div className="card ">
                  <img
                    src={post.imageUrl}
                    className="card-img-top blog-post-image"
                    alt={post.title}
                  />
                  <p className="card-text">{post.content}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      Posted on{" "}
                      {moment(post.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogList;
