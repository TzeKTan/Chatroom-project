import React from "react"
import { Card, Button } from "react-bootstrap";


function BadgerMessage(props) {

    const dt = new Date(props.created);
    const handleDelete = () => {
        // Invoke the delete callback passed from the parent
        props.onDelete(props.id);
    }


    return <Card style={{margin: "0.5rem", padding: "0.5rem"}}>
            <h2>{props.title}</h2>
            <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
            <br/>
            <i>{props.poster}</i>
            <p>{props.content}</p>
            {/* render delete button if the post is from the user */}
            {props.isOwner && <Button onClick={handleDelete} variant="danger">Delete</Button>}
    </Card>
}

export default BadgerMessage;