import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "./../../actions/post";

const CommentForm = ({ postId, addComment }) => {
    const [text, setText] = useState("");
    const onSubmitHandler = (e) => {
        e.preventDefault();
        addComment(postId, { text });
        setText("");
    };

    return (
        <div className="post-form">
            <div className="bg-primary p">
                {/* <h3>Leave a Comment</h3> */}
                <h3>Deja un comentario</h3>
            </div>
            <form className="form my-1" onSubmit={(e) => onSubmitHandler(e)}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    value={text}
                    // placeholder="Create a comment"
                    placeholder="Crea un comentario"
                    onChange={(e) => setText(e.target.value)}
                    required
                ></textarea>
                <input
                    type="submit"
                    className="btn btn-dark my-1"
                    // value="Submit"
                    value="Enviar"
                />
            </form>
        </div>
    );
};

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
};

export default connect(null, { addComment })(CommentForm);
