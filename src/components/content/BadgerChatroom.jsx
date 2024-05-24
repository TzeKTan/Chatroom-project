import React, { useEffect, useState, useRef } from "react"
import BadgerMessage from "./BadgerMessage";
import { Col, Row, Pagination, Form } from "react-bootstrap";

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loginStatus, setLoginStatus] = useState(sessionStorage.getItem("loginStatus"));
    const postTitle = useRef("");
    const postContent = useRef("");

    // Callback function to handle post deletion
    const handleDeletePost = (postId) => {
        fetch(`https://cs571.org/api/f23/hw6/messages?id=${postId}`, {
            method: "DELETE",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
            },
            credentials: "include",
        })
        .then((res) => res.json())
        .then((json) => {
            if (json.msg === "Successfully deleted message!") {
                alert("Successfully deleted the post!");
                // Reload the latest messages after deletion
                loadMessages(currentPage);
            } else {
                console.error("Delete post error: ", json);
            }
        })
        .catch((error) => {
            console.error("Error while deleting the post: ", error);
        });
    };

    function handleCreatePost(){
        // make sure both fields are filled out
        if (!postTitle.current.value || !postContent.current.value) {
            alert("You must provide both a title and content!");
            return;
        }
        // check if user is logged in
        if (!loginStatus) {
            alert("You must be logged in to post!");
            return;
        }

        fetch(`https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": CS571.getBadgerId()
            },
            credentials: "include",
            body: JSON.stringify({
                title: postTitle.current.value,
                content: postContent.current.value
            })
        })
        .then((res) => res.json())
        .then((json) => {
            if (json.msg === "Successfully posted message!") {
                alert("Successfully posted!");
                // Reload the latest messages
                loadMessages(currentPage);
            } else if (json.msg === "You must be logged in to do that!") {
                alert("You must be logged in to post!");
            } else {
                console.error("Unknown error: ", json);
            }
        })
        .catch((error) => {
            console.error("Error while creating the post: ", error);
        });
    };


    const loadMessages = () => {
        console.log("Loading messages for page " + currentPage);
        fetch(`https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}&page=${currentPage}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(loadMessages, [props]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        // Load messages when the currentPage state changes
        loadMessages();
      }, [currentPage]);

    return <>
        <h1>{props.name} Chatroom</h1>
        {
            /* TODO: Allow an authenticated user to create a post. */
            <div>
                    <h3>Create a Post</h3>
                    <form>
                        <div>
                            <Form.Label htmlFor="postTitle" className="form-label">Post Title</Form.Label>
                            <Form.Control ref={postTitle} id="postTitle" />    
                        </div>
                        <div>
                            <Form.Label htmlFor="postContent" className="form-label">Post Content</Form.Label>
                            <Form.Control ref={postContent} id="postContent" />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={handleCreatePost}>
                            Create Post
                        </button>
                    </form>
                </div>
        }
        <hr/>
        {
            messages.length > 0 ?
                <>
                    {
                        <Row>
                            {/* TODO: Complete displaying of messages. */}
                            {messages.map((message) => (
                                <Col key={message.id} xs={12} md={6} lg={4} xl={3} style={{ margin: "10px" }}>
                                <BadgerMessage
                                    key={message.id}
                                    title={message.title}
                                    poster={message.poster}
                                    content={message.content}
                                    created={message.created}
                                    isOwner={message.poster === loginStatus}
                                    onDelete={handleDeletePost}
                                    id={message.id}
                                />
                                </Col>
                            ))}
                        </Row>
                    }
                </>
                :
                <>
                    <p>There are no messages on this page yet!</p>
                </>
        }
        <div>
            <Pagination>
            <Pagination.Item
                active={currentPage === 1}
                onClick={() => handlePageChange(1)}
            >
                1
            </Pagination.Item>
            <Pagination.Item
                active={currentPage === 2}
                onClick={() => handlePageChange(2)}
            >
                2
            </Pagination.Item>
            <Pagination.Item
                active={currentPage === 3}
                onClick={() => handlePageChange(3)}
            >
                3
            </Pagination.Item>
            <Pagination.Item
                active={currentPage === 4}
                onClick={() => handlePageChange(4)}
            >
                4
            </Pagination.Item>
            </Pagination>
        </div>
    </>
}
