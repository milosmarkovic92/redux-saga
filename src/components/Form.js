import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addArticle, badWord } from '../js/action/action';

const mapDispatchToProps = dispatch => {
    return {
        addArticle: article => dispatch(addArticle(article)),
        badWord: word => dispatch(badWord(word))
    }
}

class Form extends Component {
    state = {
        title: ""
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { title } = this.state;
        this.props.addArticle({title});
        this.setState({
            title: ""
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }


    render() {
        const { title } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="title">Add new title</label>
                    <input type="text" value={title} name="title" id="title" onChange={this.handleChange}/>
                    <button type="submit">Add new</button>
                </form>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(Form);