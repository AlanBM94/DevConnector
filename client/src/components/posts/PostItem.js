import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, addDislike, deletePost, getPost } from "./../../actions/post";

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, dislikes, comments, date },
  addLike,
  addDislike,
  deletePost,
  showActions,
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img className="round-img" src={avatar} alt={name} />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">
        Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
      </p>
      {showActions && (
        <>
          <button
            type="button"
            className="btn btn-success"
            onClick={(e) => addLike(_id, auth.user._id)}
          >
            <i className="fas fa-thumbs-up"></i>{" "}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={(e) => addDislike(_id, auth.user._id)}
          >
            <i className="fas fa-thumbs-down"></i>{" "}
            <span>{dislikes.length > 0 && <span>{dislikes.length}</span>}</span>
          </button>
          <Link to={`/posts/${_id}`} className="btn btn-primary">
            Discussion{" "}
            {comments.length > 0 && (
              <span className="comment-count">{comments.length}</span>
            )}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              type="button"
              className="btn btn-danger-outline"
              onClick={() => deletePost(_id)}
            >
              <i className="fas fa-times"></i> Delete post
            </button>
          )}
        </>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  addDislike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, addDislike, deletePost })(
  PostItem
);
