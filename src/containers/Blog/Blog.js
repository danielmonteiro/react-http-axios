import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount() {

        axios
            .get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return { 
                        ...post,
                        author: 'Daniel'
                    }
                });
                this.setState({ posts: updatedPosts });
            })
            .catch(error => {
                this.setState({ error: true });
            });

    }

    postClickedHandler = (postId) => {
        this.setState({ selectedPostId: postId })
    }

    render () {

        let posts = this.state.posts.map(post => {
            return <Post key={post.id} title={post.title} author={post.author} postClicked={() => this.postClickedHandler(post.id)} />
        });

        if(this.state.error) {
            posts = <div style={{textAlign: 'center'}}>Something get wrong</div>;
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost selectedPostId={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;