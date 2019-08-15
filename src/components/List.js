import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        articles: state.articles
    }
}

function List({ articles }) {
    return (
        <div>
            <ul>
                {
                    articles.map((elem, index) => (
                        <li key={index}>{elem.title}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default connect(mapStateToProps)(List);