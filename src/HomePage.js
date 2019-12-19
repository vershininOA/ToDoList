import React, { Component } from 'react'

export default class HomePage extends Component {
    render() {
        return (
            <div className="outBox">
                <div className="jumbotron HomePage"> 
                    <h1>Список дел</h1>
                    <hr />
                    <a className="btn btn-primary btn-lg" href="/CardList" role="button">Заняться делами!</a>
                </div>
            </div>  
        )
    }
}