import React, { Component } from 'react'
import Card from './Card.js'
//import { threadId } from './worker_threads'
//import Data from './Data.js'

class CardList extends Component {
    constructor() {
        super()

        this.state = {
            data: JSON.parse(localStorage["CardSet"]),
            showCardsState: localStorage["showCardsState"]
           }
        
        this.changeBox = this.changeBox.bind(this)
        this.deleteCard = this.deleteCard.bind(this)
        this.restoreCard = this.restoreCard.bind(this)
        this.addCard = this.addCard.bind(this)

        this.changeBoxShowCardsState = this.changeBoxShowCardsState.bind(this)
    }
    
    ////////////////////////////////////////////////////////////////////
    // методы для работы со списком
    //////////////////////////////////////////////////////////////////   
    // изменение состояния в момент, когда нажимаются чекбоксы уровня списка
    changeBoxShowCardsState(stName){
        let _stName = stName
        if ((stName === "deleted") && (localStorage["showCardsState"] === "deleted")) 
        {
            _stName = "all"
        }

        if ((stName === "done") && (localStorage["showCardsState"] === "done")) 
        {
            _stName = "all"
        }

        if (((stName === "done") && (localStorage["showCardsState"] === "deleted")) || ((stName === "deleted") && (localStorage["showCardsState"] === "done")))
        {
            _stName = "deleted_done"
        }

        if ((stName === "done") && (localStorage["showCardsState"] === "deleted_done"))
        {
            _stName = "deleted"
        }

        if ((stName === "deleted") && (localStorage["showCardsState"] === "deleted_done"))
        {
            _stName = "done"
        }


        this.setState(
            prevState => {
                const newShowCardsState = _stName
                localStorage["showCardsState"] = newShowCardsState

                return { showCardsState: newShowCardsState }
            }
        )
    }

    // получение максимального Id в массиве карточек
    getMaxCardId(data)
    {
        let maxId = 0
        let cardSet = data
        
        maxId = cardSet.reduce((maxIdCurrent, item) => {
                      if (item.todoId > maxIdCurrent) return item.todoId
                      else return maxIdCurrent
              }, 0)
              
        return maxId + 1
    }

    // добавление новой карточки
    addCard(card)
    {
        let newCard;
        let maxCardId = this.getMaxCardId(this.state.data)

        if(!card)
        {
            newCard = {
                todoId: maxCardId,
                todoText: "Новая карточка",
                done: false,
                deleted: false
            }
        }

        // изменим состояние
        this.setState(
            prevState => {
                const newData = prevState.data;
                newData.unshift(newCard)

                // теперь сохраним данные в localStorage
                localStorage["CardSet"] = JSON.stringify(newData)

                return { data: newData }
            }
        )
    }

    ////////////////////////////////////////////////////////////////////
    // методы для работы с карточкой на уровне карточки
    ////////////////////////////////////////////////////////////////////
    // отметка/разотметка чекбокса на карточке (сделано/не сделано)
    changeBox(id){
        this.setState(
            prevState => {
                const newData = prevState.data.map(item => {
                    if (item.todoId === id) item.done = !item.done
                    return item
                })

                // теперь сохраним данные в localStorage
                localStorage["CardSet"] = JSON.stringify(newData)

                return { data: newData }
            }
        )
    }

    // пометка карточки как удалённой
    deleteCard(id){
        this.setState(
            prevState => {
                const newData = prevState.data.map(item => {
                        if (item.todoId === id) item.deleted = true
                        return item
                    })

                // сохраняем данные в localStorage
                localStorage["CardSet"] = JSON.stringify(newData)

                return { data: newData }
            }
        )
    }

    // восстановление карточки из удалённых
    restoreCard(id){
        this.setState(
            prevState => {
                const newData = prevState.data.map(item => {
                        if (item.todoId === id) item.deleted = false
                        return item
                    })

                // сохраняем данные в localStorage
                localStorage["CardSet"] = JSON.stringify(newData)

                return { data: newData }
            }
        )
    }

    //////////////////////////////////////////////////////////////////   
    //////////////////////////////////////////////////////////////////   
    //////////////////////////////////////////////////////////////////   
    render () {
        // подготовим контент для рендера
        const showCardsState = this.state.showCardsState
        let cardSet;

        switch(showCardsState)
        {
            case "all" : {
                    cardSet = this.state.data.map((item, i) =>
                    {
                        if (item.deleted === false) {
                            return <Card    key={item.todoId} 
                                            todoId={item.todoId} 
                                            todoText={item.todoText} 
                                            done={item.done}
                                            deleted={item.deleted} 
                                            changeBox={this.changeBox} 
                                            deleteCard={this.deleteCard}
                                            restoreCard={this.restoreCard}
                                            /> 
                        }
                    })
                break;
            }

            case "deleted" : {
                cardSet = this.state.data.map((item, i) =>
                {
                    if (item.deleted === true) {
                        return <Card    key={item.todoId} 
                                        todoId={item.todoId} 
                                        todoText={item.todoText} 
                                        done={item.done}
                                        deleted={item.deleted} 
                                        changeBox={this.changeBox} 
                                        deleteCard={this.deleteCard}
                                        restoreCard={this.restoreCard}
                                        /> 
                    }
                })
                break;
            }

            case "done" : {
                cardSet = this.state.data.map((item, i) =>
                {
                    if ((item.deleted === false) && (item.done === true)) {
                        return <Card    key={item.todoId} 
                                        todoId={item.todoId} 
                                        todoText={item.todoText} 
                                        done={item.done}
                                        deleted={item.deleted} 
                                        changeBox={this.changeBox} 
                                        deleteCard={this.deleteCard}
                                        restoreCard={this.restoreCard}
                                        /> 
                    }
                })
                break;
            }

            case "deleted_done" : {
                cardSet = this.state.data.map((item, i) =>
                {
                    if ((item.deleted === true) && (item.done === true)) {
                        return <Card    key={item.todoId} 
                                        todoId={item.todoId} 
                                        todoText={item.todoText} 
                                        done={item.done}
                                        deleted={item.deleted} 
                                        changeBox={this.changeBox} 
                                        deleteCard={this.deleteCard}
                                        restoreCard={this.restoreCard}
                                        /> 
                    }
                })
                break;
            }

            default : break;
        }
        
        /////////////////////////////////////////////////////////////////////////////
        // отрисовка
        return (
            <section>
                <div>
                    Добавить карточку &nbsp;
                    <input type="text" /> &nbsp;
                    <button onClick={() => {this.addCard()}}> Ok </button>
                </div>
                <hr></hr>

                <div>
                    Удалённые <input type="checkbox" onChange={()=>{ this.changeBoxShowCardsState("deleted") }} />
                    Сделано <input type="checkbox" onChange={()=>{ this.changeBoxShowCardsState("done") }}/>
                </div>
                <hr></hr>

                Список карточек:
                { cardSet }
            </section>
        )
    }
}

export default CardList