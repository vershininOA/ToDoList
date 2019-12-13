import React, { Component } from 'react';

class Card extends Component {
    constructor() {
        super()
        this.state = {
            clickCount: 0
        }

        this.countClick = this.countClick.bind(this)
    }

    countClick() {
        this.setState(prevState => {
            return {
                clickCount: prevState.clickCount + 1
            }
        })
    }

    render () {

        //console.log("this.props.done = " + this.props.done)
        //console.log("this.props.deleted = " + this.props.deleted)
        let button = <button onClick={() => this.props.deleteCard(this.props.todoId)}> Удалить </button>
        if (this.props.deleted) button = <button onClick={() => this.props.restoreCard(this.props.todoId)}> Восстановить </button>


        let useStyle = "card"
        if (this.props.done === false && this.props.deleted === true) useStyle = "card-deleted"
        else if (this.props.done === true) useStyle = "card-done"

        return (
            <div className={useStyle}>
                    <p>Количество нажатий на карточку: {this.state.clickCount}</p>
                    <input type="checkbox" checked={this.props.done} onClick={this.countClick} onChange={() => this.props.changeBox(this.props.todoId)} />
                    <p>Текст карточки: {this.props.todoText}</p>
                    <div>
                        {/* <button onClick={() => this.props.deleteCard(this.props.todoId)}> Удалить </button> */}
                        { button }
                    </div>
            </div>
        )
    }
}

export default Card;

