import React, {Component} from 'react'
import Card from './Card.js'

class CardList extends Component {
	constructor() {
		super();

		this.state = {
			data: JSON.parse(localStorage["CardSet"]),
			showCardsState: localStorage["showCardsState"],
			cardText: ""
		};

		this.changeCardState = this.changeCardState.bind(this);
		this.changeCardText = this.changeCardText.bind(this);
	}

	componentDidMount () {
		// узнаем ширину скроллбара браузера
		// создадим элемент с прокруткой
		let div = document.createElement('div');

		div.style.overflowY = 'scroll';
		div.style.width = '50px';
		div.style.height = '50px';

		// мы должны вставить элемент в документ, иначе размеры будут равны 0
		document.body.append(div);
		let scrollWidth = div.offsetWidth - div.clientWidth;
		
		div.remove();

		let cardSetDiv = document.getElementById("cardSetId");
		cardSetDiv.style.marginTop = "8vw";
		cardSetDiv.style.marginLeft = ((scrollWidth / 2).toString() + "px");
	}

	//////////////////////////////////////////////////////////////////
	needToDoneCount = () => {
		return this.state.data.reduce((currentCount, item) => {
			if (!item.done && !item.deleted) return (currentCount + 1);
			else return currentCount
		}, 0)
	};
	
	clearDeletedList = () => {
		this.setState(
			prevState => {
				const newData = prevState.data.filter(item => {
					return !item.deleted
				});

				localStorage["CardSet"] = JSON.stringify(newData);
				return { data: newData }
			})
	};

	changeCardText = (event) => {
		const { id, value } = event.target;

		this.setState(
			prevState => {
					const newData = prevState.data.map(item => {
						if(item.todoId.toString() === id) {
							item.todoText = value
						}

						return item
					});

					localStorage["CardSet"] = JSON.stringify(newData)
					return { data: newData }
				})
	};
	
	doCardsChangeMark = () => {
		this.setState(
			prevState =>
			{
				let newData = prevState.data;
				const flag = newData.reduce((currentRes, item) => {
					return item.deleted ? (currentRes && true) : (currentRes && item.done)
				}, true);

				newData = newData.map(item => {
					if(!item.deleted) item.done = !flag;
					return item
				});

				localStorage["CardSet"] = JSON.stringify(newData)
				return { data: newData }
			}
		)
	};

	cardNewChangeText = (event) => {
		const {name, value} = event.target;
		this.setState({ 
			[name]: value 
		})
	};
	
	changeBoxShowCardsState(stName){
		let _stName = stName

		if ((stName === "done") 		&& (localStorage["showCardsState"] === "done")) 								_stName = "all";
		if ((stName === "done") 		&& (localStorage["showCardsState"] === "deleted_done")) 						_stName = "deleted";
		if ((stName === "done") 		&& (localStorage["showCardsState"] === "deleted_need_done")) 					_stName = "deleted_done";
		if (((stName === "done") 		&& (localStorage["showCardsState"] === "deleted")) || ((stName === "deleted") 
										&& (localStorage["showCardsState"] === "done"))) 								_stName = "deleted_done";
		if ((stName === "deleted") 		&& (localStorage["showCardsState"] === "deleted")) 								_stName	= "all";
		if ((stName === "deleted") 		&& (localStorage["showCardsState"] === "deleted_done")) 						_stName	= "done";
		if ((stName === "need_done") 	&& (localStorage["showCardsState"] === "need_done")) 							_stName	= "all";
		if ((stName === "need_done") 	&& (localStorage["showCardsState"] === "deleted_done")) 						_stName	= "deleted_need_done";
		if ((stName === "need_done") 	&& (localStorage["showCardsState"] === "deleted_need_done")) 					_stName	= "deleted";
		if (((stName === "need_done") 	&& (localStorage["showCardsState"] === "deleted")) || ((stName === "deleted") 
										&& (localStorage["showCardsState"] === "need_done"))) 							_stName	= "deleted_need_done";

		this.setState(
			prevState => {
				const newShowCardsState = _stName
				localStorage["showCardsState"] = newShowCardsState

				return { showCardsState: newShowCardsState }
			}
		)
	}

	getMaxCardId = (data) => {
		const maxId = data.reduce((maxIdCurrent, item) => (
					  item.todoId > maxIdCurrent ? item.todoId : maxIdCurrent
		), 0);
			  
		return maxId + 1
	};

	addCard = () => {
		this.setState(
			prevState => {
				const newData = prevState.data;
				newData.unshift(
					{
						todoId:		this.getMaxCardId(this.state.data),
						todoText:	this.state.cardText,
						done:		false,
						deleted:	false
					}
				);

				localStorage["CardSet"] = JSON.stringify(newData)

				return { 
							data:		newData,
							cardText:	""
						}
			}
		)
	};

	changeCardState = (id, cardState) => {
		this.setState(
			prevState => {
				const newData = prevState.data.map(item => {
					if (item.todoId === id) item[cardState] = !item[cardState];
					return item
				});

				localStorage["CardSet"] = JSON.stringify(newData);
				return { data: newData }
			}
		)
	};

	//////////////////////////////////////////////////////////////////
	render () {
		let btnClearDeletedList = "";
		let btnMarkUnmark = "";
		let _data;
		let flagMark;

		// не будем показывать кнопку "сделано/не сделано" если установлены фильтры для удалённых карточек
		if (this.state.showCardsState !== "deleted" && this.state.showCardsState !== "deleted_done" && this.state.showCardsState !== "deleted_need_done") 
		{      
			btnMarkUnmark 	= 	<button 
									className 	= "btn btn-success btnList"
									onClick		= { this.doCardsChangeMark }
								> 
									Всё готово
								</button>;
			_data 			= 	this.state.data;
			
			flagMark = _data.reduce((doneCurrent, item) => 
				{
					if (item.deleted) return (doneCurrent && true);   // удалённая карточка всегда будет возвращать true чтобы не влиять на остальные
					else return (doneCurrent && item.done)
				}, true);
		 
			if (flagMark) btnMarkUnmark =	<button 
												className	= "btn btn-danger btnList"
												onClick		= { this.doCardsChangeMark }
											>
												Отменить!
											</button>
		}

		if (this.state.showCardsState === "deleted" || this.state.showCardsState === "deleted_done" || this.state.showCardsState === "deleted_need_done")
		{
			btnClearDeletedList = 	<button	className	= "btn btn-danger btnList" 
											onClick		= { ()=>this.clearDeletedList() }
									> 
										Очистить 
									</button>;
		}

		const showCardsState 	= this.state.showCardsState
		let checkboxDone 		= 	<input 
										type		= "checkbox"
										onChange	= {()=>{ this.changeBoxShowCardsState("done") }}
									/>;
		let checkboxNeedDone 	= 	<input
										type		= "checkbox"
										onChange	= {()=>{ this.changeBoxShowCardsState("need_done") }}
									/>;
		let checkboxDeleted 	= 	<input
										type		= "checkbox"
										onChange	= {()=>{ this.changeBoxShowCardsState("deleted") }}
									/>;

		let cardSet;
		switch(showCardsState)
		{
			case "all" : {
					cardSet = this.state.data.map((item, i) => {
						if (!item.deleted) {
							return <Card    key			= {item.todoId}
											todoId		= {item.todoId}
											todoText	= {item.todoText}
											done		= {item.done}
											deleted		= {item.deleted}

											changeCardState	= {this.changeCardState}
											changeCardText	= {this.changeCardText}
									/>
						}
					});
				break;
			}

			case "deleted" : {
				cardSet = this.state.data.map((item, i) => {
					if (item.deleted) {
						return <Card    key			= {item.todoId}
										todoId		= {item.todoId}
										todoText	= {item.todoText}
										done		= {item.done}
										deleted		= {item.deleted}
										disabled	= "disabled"

										changeCardState	= {this.changeCardState}
								/>
					}
				});

				checkboxDeleted =	<input
										type		= "checkbox"
										onChange	= {()=>{ this.changeBoxShowCardsState("deleted") }}
										checked
									/>;
				break;
			}

			case "done" : {
				cardSet = this.state.data.map((item, i) => {
					if (!item.deleted && item.done) {
						return <Card    key			= {item.todoId}
										todoId		= {item.todoId}
										todoText	= {item.todoText}
										done		= {item.done}
										deleted		= {item.deleted}

										changeCardState	= {this.changeCardState}
								/>
					}
				});

				checkboxDone = 	<input 
									type		= "checkbox"
									onChange	= {()=>{ this.changeBoxShowCardsState("done") }}
									checked
								/>;
				break;
			}

			case "need_done" : {
				cardSet = this.state.data.map((item, i) => {
					if (!item.deleted && !item.done) {
						return <Card    key			= {item.todoId}
										todoId		= {item.todoId}
										todoText	= {item.todoText}
										done		= {item.done}
										deleted		= {item.deleted}

										changeCardState	= {this.changeCardState}
										changeCardText	= {this.changeCardText}
								/>
					}
				});

				checkboxNeedDone 	=	<input 
											type		= "checkbox"
											onChange	= {()=>{ this.changeBoxShowCardsState("need_done") }}
											checked
										/>;
				checkboxDone 		=	<input
											type		= "checkbox"
											onChange	= {()=>{ this.changeBoxShowCardsState("done") }}
										/>;
				break;
			}

			case "deleted_need_done" : {
				cardSet = this.state.data.map((item, i) => {
					if (item.deleted && !item.done) {
						return <Card    key			= {item.todoId}
										todoId		= {item.todoId}
										todoText	= {item.todoText}
										done		= {item.done}
										deleted		= {item.deleted}

										changeCardState	= {this.changeCardState}
								/>
					}
				});

				checkboxNeedDone 	= 	<input
											type		= "checkbox"
											onChange	= {()=>{ this.changeBoxShowCardsState("need_done") }}
											checked
										/>;
				checkboxDeleted 	= 	<input
											type		= "checkbox"
											onChange	= {()=>{ this.changeBoxShowCardsState("deleted") }}
											checked
										/>;
				checkboxDone 		= 	<input
											type		= "checkbox"
											onChange	= {()=>{ this.changeBoxShowCardsState("done") }}
										/>;
				break;
			}

			case "deleted_done" : {
				cardSet = this.state.data.map((item, i) => {
					if (item.deleted && item.done) {
						return <Card    key			= {item.todoId}
										todoId		= {item.todoId}
										todoText	= {item.todoText}
										done		= {item.done}
										deleted		= {item.deleted}

										changeCardState	= {this.changeCardState}
								/>
					}
				});

				checkboxDeleted =	<input
										type		= "checkbox"
										onChange	= {()=>{ this.changeBoxShowCardsState("deleted") }}
										checked
									/>;
				checkboxDone 	=	<input
										type		= "checkbox"
										onChange	= {()=>{ this.changeBoxShowCardsState("done") }}
										checked
									/>;
				break;
			}

			default : break;
		}
		
		/////////////////////////////////////////////////////////////////////////////
		return ( 
			<section Style="height: 100vh; width: 99vw;">
				<div Style="width:100%;">
					<div id="cardSetId">
						{ cardSet }
					</div>
					<div className="navPanel">
						<div className="navPanelTop">
							<div className="navPanelCheckBoxArea">
								<label className="lblCheckbox">Удалённые</label> { checkboxDeleted }
								<label className="lblCheckbox">Сделано</label> { checkboxDone }
								<label className="lblCheckbox">Нужно сделать</label> { checkboxNeedDone }
								<label className="badge badge-warning">Осталось сделать: { this.needToDoneCount() } </label>
							</div>

							<div className="navPanelBtnArea">
								{ btnMarkUnmark } 
								{ btnClearDeletedList }
							</div>

							<div>
								<a 	className="btn btn-warning" 
									href="/" 
									role="button" 
									Style="font-size:11pt; font-weight:bold;"
								>
									На главную
								</a>
							</div>
						</div>

						<div className="navPanelBottom" >
								<div className="form-inline">
									<input 	className="form-control" 
											name="cardText" 
											type="text" 
											Style="width:18vw;" 
											value={ this.state.cardText } 
											onChange={ this.cardNewChangeText } 
											placeholder="текст новой задачи здесь" 
									/> &nbsp;	
									<button className="btn btn-success" 
											onClick={() => {this.addCard()}}
									> 
										Ok 
									</button>
								</div>
						</div>
					</div>
				</div>
			</section>
		)
	}
}

export default CardList