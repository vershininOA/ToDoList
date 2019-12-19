import React, { Component } from 'react';
import { enumBooleanBody } from '@babel/types';

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
        let button = <button className="btn btn-primary" onClick={() => this.props.deleteCard(this.props.todoId)} Style="float:right;"> Удалить </button>
        let textarea = <textarea className="cardTextarea" rows="3" id={ this.props.todoId } value={ this.props.todoText } onChange={ (event) => this.props.changeCardText(event) } />
        
        if (this.props.deleted) { 
            button = <button className="btn btn-primary" onClick={() => this.props.restoreCard(this.props.todoId)} Style="float:right;"> Восстановить </button> 
            textarea = <textarea className="cardTextarea" rows="3" id={ this.props.todoId } disabled value={ this.props.todoText } onChange={ (event) => this.props.changeCardText(event) } />
        }

        let useStyle = "";
        
        if (this.props.deleted) {
            if (this.props.done) {
                useStyle = "cardItemDeletedDone"
            } else useStyle = "cardItemDeleted"
        } else { 
            if (this.props.done) useStyle = "cardItemDone"
        }

        return (
            <div className="cardBox">
                <div className="card cardItem">
                    <div className={useStyle}>
                        <div Style="card-body">
                            <p className="card-text"> { textarea } </p>
                        </div>

                        <div className="cardBottomArea">
                            <div className="cardBottomCheckboxArea">
                                {
                                    (this.props.deleted)?<label><input type="checkbox" disabled checked={this.props.done} onChange={() => this.props.changeBox(this.props.todoId)} /> Готово </label>: 
                                                         <label><input type="checkbox" checked={this.props.done} onChange={() => this.props.changeBox(this.props.todoId)} /> Готово </label>
                                }
                            </div>

                            <div className="cardButtonDoneArea">
                                { button }
                            </div>
                        </div>
                    </div>   
                </div>
            </div>
        )
    }
}

export default Card;

