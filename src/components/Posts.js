import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getData } from '../js/action/action';

const mapStateToProps = state => {
    return {
        oldPosts: state.oldPosts.slice(0, 10)
    }
}

class Posts extends Component {

    componentDidMount() {
        this.props.getData();
    }

    render() {
        return (
            <div>
                {
                    this.props.oldPosts.map(elem => (
                        <p key={elem.id}>{elem.title}</p>
                    ))
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, {getData})(Posts);