import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { postActions } from '../_actions/post.actions';

class HomePage extends React.Component {

    constructor(props) {
        super(props);

        const { user } = this.props

        this.state = {
            post: {
                username: user.username,
                msg: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(userActions.getAll());
        this.props.dispatch(postActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    handleDeletePost(id) {
        return (e) => this.props.dispatch(postActions.delete(id));
    }


    handleChange(event) {
        const { name, value } = event.target;
        const { post } = this.state;
        this.setState({
            post: {
                ...post,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.dispatch(postActions.getAll());

        this.setState({ submitted: true });
        const { post } = this.state;
        const { dispatch, users, user} = this.props;
        const unameprop = "username"
        const uname = user.username
        this.setState({
            post: {
                ...post,
                [unameprop]: uname
            }
        });

        if (post.msg) {
            console.log("   inside if: " + post.msg + "\nUser username:" + post.username)
            dispatch(postActions.create(post));
        }
    }

    render() {
        const { user, users, posts, post} = this.props;
        const { msg } = this.state;
        //msg.setState({author: user.firstName})
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in with React!!</p>
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                                {user.firstName + ' ' + user.lastName}
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                }
                <h3>All your posts:</h3>
                {posts.loading && <em>Loading posts...</em>}
                {posts.error && <span className="text-danger">ERROR: {posts.error}</span>}
                {posts.items &&
                    <ul>
                        {posts.items.map((post, index) =>
                            <li key={post.id}>
                                {'"' + post.msg + '" - Written by: ' + post.username}
                                {
                                    post.deleting ? <em> - Deleting...</em>
                                    : post.deleteError ? <span className="text-danger"> - ERROR: {post.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeletePost(post.id)}>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                }
                <form onSubmit={this.handleSubmit}>
                    <textarea rows="5" cols="50" name="msg"
                            id="postbox" onChange={this.handleChange} value={msg}></textarea>
                    <button>Submit</button>
                </form> 
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication, posts, post} = state;
    const { user } = authentication;
    return {
        user,
        users,
        posts,
        post
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };