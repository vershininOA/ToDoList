import React, { Component } from 'react'
import Card from './Card.js'

class CardList extends Component {
    constructor() {
        super()

        this.state = {
            data: JSON.parse(localStorage["CardSet"]),
            showCardsState: localStorage["showCardsState"],
            cardText: ""
           }

        this.changeBox = this.changeBox.bind(this)
        this.deleteCard = this.deleteCard.bind(this)
        this.restoreCard = this.restoreCard.bind(this)
        this.addCard = this.addCard.bind(this)
        this.changeBoxShowCardsState = this.changeBoxShowCardsState.bind(this)

        this.cardNewChangeText = this.cardNewChangeText.bind(this)
        this.doCardsMark = this.doCardsMark.bind(this)
        this.doCardsUnMark = this.doCardsUnMark.bind(this)

        this.changeCardText = this.changeCardText.bind(this)
        this.clearDeletedList = this.clearDeletedList.bind(this)

        this.needToDoneCount = this.needToDoneCount.bind(this)
    }
    
    ////////////////////////////////////////////////////////////////////
    // методы для работы со списком, на уровне списка
    //////////////////////////////////////////////////////////////////   
    // подсчёт количества карточек, которые не отмечены как выполненные
    needToDoneCount()
    {
        let count = this.state.data.reduce((currentCount, item) => {
            if (!item.done && !item.deleted) return (currentCount + 1) 
            else return currentCount 
        }, 0)

        return count
    }
    
    // очистака списка удалённых карточек
    clearDeletedList()
    {
        this.setState(
            prevState => {
                const newData = prevState.data.filter(item => {
                    return !item.deleted
                })

                // сохраним данные в local Storage
                localStorage["CardSet"] = JSON.stringify(newData)

                return { data: newData }
            }
        )
    }

    // изменение текста карточки
    changeCardText(event)
    {
        let cardId = event.target.id
        let cardText = event.target.value

        // изменим состояние
        this.setState(
            prevState => 
                {
                    const newData = prevState.data.map(item => {
                        if(item.todoId.toString() === cardId)
                        { 
                            item.todoText = cardText
                        }

                        return item
                    })

                    // сохраним данные в localStorage
                    localStorage["CardSet"] = JSON.stringify(newData)

                    return { data: newData }
                }
            )
    }
    
    // пометка всех карточек которые НЕ удалены
    doCardsMark()
    {
        this.setState(
            prevState =>
                {
                    const newData = prevState.data.map(item => {
                        if(!item.deleted) item.done = true
                        
                        return item
                    })
    
                    // теперь сохраним данные в localStorage
                    localStorage["CardSet"] = JSON.stringify(newData)
    
                    return { data: newData }
                }
        )
    }

    // убираем пометку всех неудалённых карточек
    doCardsUnMark()
    {
        this.setState(
            prevState =>
                {
                    const newData = prevState.data.map(item => {
                        if(!item.deleted) item.done = false
                        return item
                    })
    
                    // теперь сохраним данные в localStorage
                    localStorage["CardSet"] = JSON.stringify(newData)
    
                    return { data: newData }
                }
        )
    }

    // сохранение в состоянии вводимого текста в поле для создания новой карточки
    cardNewChangeText(event)
    {
        const {name, value} = event.target
        this.setState({ 
            [name]: value 
        })
    }
    
    // изменение состояния в момент, когда нажимаются чекбоксы уровня списка
    // stName - то что прилетает
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

        if ((stName === "need_done") && (localStorage["showCardsState"] === "need_done")) 
        {
            _stName = "all"
        }

        if ((stName === "need_done") && (localStorage["showCardsState"] === "deleted_done")) 
        {
            _stName = "deleted_need_done"
        }


        if ((stName === "need_done") && (localStorage["showCardsState"] === "deleted_need_done")) 
        {
            _stName = "deleted"
        }

        if (((stName === "done") && (localStorage["showCardsState"] === "deleted")) || ((stName === "deleted") && (localStorage["showCardsState"] === "done")))
        {
            _stName = "deleted_done"
        }

        if (((stName === "need_done") && (localStorage["showCardsState"] === "deleted")) || ((stName === "deleted") && (localStorage["showCardsState"] === "need_done")))
        {
            _stName = "deleted_need_done"
        }

        if ((stName === "done") && (localStorage["showCardsState"] === "deleted_done"))
        {
            _stName = "deleted"
        }

        if ((stName === "deleted") && (localStorage["showCardsState"] === "deleted_done"))
        {
            _stName = "done"
        }

        if ((stName === "done") && (localStorage["showCardsState"] === "deleted_need_done"))
        {
            _stName = "deleted_done"
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
        let cardSet = data
        let maxId = cardSet.reduce((maxIdCurrent, item) => {
                      if (item.todoId > maxIdCurrent) return item.todoId
                      else return maxIdCurrent
              }, 0)
              
        return maxId + 1
    }

    // добавление новой карточки. аргумент card - на перспективу
    addCard(card)
    {
        let newCard;
        let maxCardId = this.getMaxCardId(this.state.data)

        if(!card)
        {
            newCard = {
                todoId: maxCardId,
                todoText: this.state.cardText,
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

                return { 
                            data: newData,
                            cardText: "" // очистим поле ввода текста для новой карточки
                        }
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
        
        // let rt = this.props.match.params.rt
        // switch (rt) {
        //     case "deleted" : {
        //         if (localStorage["showCardsState"] !== "deleted") {
        //             this.setState(
        //                 prevState => {
        //                             return {
        //                                         showCardsState: "deleted"
        //                                     }
        //                             })
                    
        //             localStorage["showCardsState"] = "deleted"
        //         }
                
        //         break;
        //     }

        //     default : {
        //         break;
        //     }
        // }                                  

        // кнопка очистки списка удалённых карточек
        let btnClearDeletedList = ""

        // кнопка отметки/разотметки
        let btnMarkUnmark = ""
        
        let _data
        let flagMark

        // не будем показывать кнопку "сделано/не сделано" если установлены фильтры для удалённых карточек
        if (this.state.showCardsState !== "deleted" && this.state.showCardsState !== "deleted_done" && this.state.showCardsState !== "deleted_need_done") 
        {      
            btnMarkUnmark = <button className="btn btn-success btnList" onClick={ this.doCardsMark }> Всё готово </button>
            _data = this.state.data
            let i = 0
            flagMark = _data.reduce((doneCurrent, item) => 
                {
                    if (item.deleted) return (doneCurrent && true)   // удалённая карточка всегда будет возвращать true чтобы не влиять на остальные
                    else return (doneCurrent && item.done)
                }, true)
         
            if(flagMark) btnMarkUnmark = <button className="btn btn-danger btnList" onClick={ this.doCardsUnMark }> Отменить! </button>
        }

        // кнопку очистки удалённых карточек покажем если показываются удалённые карточки
        if (this.state.showCardsState === "deleted" || this.state.showCardsState === "deleted_done" || this.state.showCardsState === "deleted_need_done")
        {
            btnClearDeletedList = <button className="btn btn-danger btnList" onClick={ ()=>this.clearDeletedList()  }> Очистить </button>
        }

        // режим фильтрации из состояния компонента
        const showCardsState = this.state.showCardsState

        // заготовки для чекбоксов фильтров
        let checkboxDone = <input type="checkbox" onChange={()=>{ this.changeBoxShowCardsState("done") }} />
        let checkboxNeedDone = <input type="checkbox" onChange={()=>{ this.changeBoxShowCardsState("need_done") }} />
        let checkboxDeleted = <input type="checkbox" onChange={()=>{ this.changeBoxShowCardsState("deleted") }} />

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
                                            changeCardText={this.changeCardText}
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
                                        disabled="disabled"
                                        /> 
                    }
                })

                checkboxDeleted = <input type="checkbox" checked onChange={()=>{ this.changeBoxShowCardsState("deleted") }} />
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

                checkboxDone = <input type="checkbox" checked onChange={()=>{ this.changeBoxShowCardsState("done") }}/>
                break;
            }

            case "need_done" : {
                cardSet = this.state.data.map((item, i) =>
                {
                    if ((item.deleted === false) && (item.done === false)) {
                        return <Card    key={item.todoId} 
                                        todoId={item.todoId} 
                                        todoText={item.todoText} 
                                        done={item.done}
                                        deleted={item.deleted} 
                                        changeBox={this.changeBox} 
                                        deleteCard={this.deleteCard}
                                        restoreCard={this.restoreCard}
                                        changeCardText={this.changeCardText}
                                        /> 
                    }
                })

                checkboxNeedDone = <input type="checkbox" checked onChange={()=>{ this.changeBoxShowCardsState("need_done") }}/>
                checkboxDone = <input type="checkbox" onChange={()=>{ this.changeBoxShowCardsState("done") }}/>
                break;
            }

            case "deleted_need_done" : {
                cardSet = this.state.data.map((item, i) =>
                {
                    if ((item.deleted === true) && (item.done === false)) {
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

                checkboxNeedDone = <input type="checkbox" checked onChange={()=>{ this.changeBoxShowCardsState("need_done") }}/>
                checkboxDeleted = <input type="checkbox" checked onChange={()=>{ this.changeBoxShowCardsState("deleted") }} />
                checkboxDone = <input type="checkbox" onChange={()=>{ this.changeBoxShowCardsState("done") }}/>
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

                checkboxDeleted = <input type="checkbox" checked onChange={()=>{ this.changeBoxShowCardsState("deleted") }} />
                checkboxDone = <input type="checkbox" checked onChange={()=>{ this.changeBoxShowCardsState("done") }}/>
                break;
            }

            default : break;
        }
        
        /////////////////////////////////////////////////////////////////////////////
        // отрисовка
        return ( 
            <section Style="height: 100vh; width: 99vw;">
                <div Style="width:100%;">
                    <div className="navPanel">
                    <div className="navPanelTop">
                        <div Style="width:500px;">
                            <label className="lblCheckbox">Удалённые</label> { checkboxDeleted} 
                            <label className="lblCheckbox">Сделано</label> { checkboxDone }
                            <label className="lblCheckbox">Нужно сделать</label> { checkboxNeedDone }
                            <label className="badge badge-warning">Осталось сделать: { this.needToDoneCount() } </label>
                        </div>

                        <div className="navPanelBtnArea">
                            { btnMarkUnmark } 
                            { btnClearDeletedList }
                        </div>

                        <div>
                            <a className="btn btn-warning" href="/" role="button" Style="font-size:11pt; font-weight:bold;">На главную</a>
                        </div>
                    </div>

                    <div className="navPanelBottom">
                            <div className="form-inline my-2 my-lg-0">
                                <input className="form-control" name="cardText" type="text" Style="width:270px;" value={ this.state.cardText } onChange={ this.cardNewChangeText } placeholder="текст новой задачи здесь" /> &nbsp;
                                <button className="btn btn-success" onClick={() => {this.addCard()}}> Ok </button>
                            </div>
                    </div>
                    </div>

                    <div Style="margin-top:160px;">
                        { cardSet }
                    </div>

                </div>
            </section>
        )
    }
}

export default CardList