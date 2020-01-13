import React, { Component } from 'react'
import { connect } from "react-redux"

import {
	FilterDeletedState,
	FilterDoneState,
	FilterNeedDoneState,
	getMarkFlag,
	VisibleCards
} from "../src/selectors/index";

import {
	setFilterDeletedState,
	setFilterDoneState,
	setFilterNeedDoneState,
	clearDeletedCards,
	cardMarkAll,
	cardUnMarkAll
} from "./actions/cardList"

import Card from './Card'
import { addCard } from "./actions/card";

const mapStateToProps = (state) => {
	return {
		getFilterDeleted: FilterDeletedState(state),
		getFilterDone: FilterDoneState(state),
		getFilterNeedDone: FilterNeedDoneState(state),
		getMarkFlag: getMarkFlag(state),
		getVisibleCards: VisibleCards(state)
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		doSetFilterDeletedState: () => dispatch(setFilterDeletedState()),
		doSetFilterDoneState: () => dispatch(setFilterDoneState()),
		doSetFilterNeedDoneState: () => dispatch(setFilterNeedDoneState()),
		addCard: (todoText) => dispatch(addCard(todoText)),
		clearDeletedCards: () => dispatch(clearDeletedCards()),
		cardMarkAll: () => dispatch(cardMarkAll()),
		cardUnMarkAll: () => dispatch(cardUnMarkAll())
	}
};

class ConnectedCardList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cardText: ""
		};
	}

	cardNewChangeText = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		})
	};

	render() {
		let cardSet = this.props.getVisibleCards;
		const markFlag = this.props.getMarkFlag;
		let buttonMark;
		if (markFlag) {
			buttonMark = <button className="btn btn-danger btnList" onClick={this.props.cardUnMarkAll}> Всё отменить </button>
		} else {
			buttonMark = <button className="btn btn-success btnList" onClick={this.props.cardMarkAll}> Всё готово </button>
		}

		return (
			<section Style="height: 100%; width: 100%;">
				{
					(!cardSet) ? <label>Список пуст!</label> :
						<div Style="margin-top:11%;">
							{
								cardSet.map(item => {
									return (
										<Card key={item.todoId}
											todoId={item.todoId}
											todoText={item.todoText}
											done={item.done}
											deleted={item.deleted}
										/>
									);
								})
							}
						</div>
				}

				<div className="navPanel">
					<   div className="navPanelTop">
						<div className="navPanelCheckBoxArea">
							<label className="lblCheckbox"> Удалённые </label>
							<input
								type="checkbox"
								checked={this.props.getFilterDeleted}
								onChange={() => this.props.doSetFilterDeletedState()}
							/>


							<label className="lblCheckbox"> Сделано </label>
							<input
								type="checkbox"
								checked={this.props.getFilterDone}
								onChange={() => this.props.doSetFilterDoneState()}
							/>


							<label className="lblCheckbox"> Нужно сделать </label>
							<input
								type="checkbox"
								checked={this.props.getFilterNeedDone}
								onChange={() => this.props.doSetFilterNeedDoneState()}
							/>
						</div>

						{
							<div className="navPanelBtnArea">
								{
									(!this.props.getFilterDeleted) ? <div Style={"margin-right:5px; float:left;"}> {buttonMark} </div> : <span></span>
								}

								{
									(this.props.getFilterDeleted) ?
										<div>
											<button className="btn btn-danger btnList"
												onClick={() => this.props.clearDeletedCards()}
												Style={"float:left;"}
											>
												Очистить
                                            </button>
										</div>
										: <span></span>
								}

								<a
									className="btn btn-warning btnList"
									Style="float:right;"
									role="button"
									href="/"
								>
									На главную
                                </a>
							</div>
						}
					</div>

					<div className="navPanelBottom">
						<input
							name="cardText"
							className="form-control"
							type="text"
							Style="width:18%; margin-right:5px;"
							value={this.state.cardText}
							onChange={this.cardNewChangeText}
							placeholder={"введите текст здесь"}
						/>

						<button
							className="btn btn-primary btnList"
							// Style={"float:right;"}
							onClick={() => this.props.addCard(this.state.cardText)}
						>
							Добавить
                            </button>
					</div>
				</div>
			</section>
		)
	}
}

const CardList = connect(mapStateToProps, mapDispatchToProps)(ConnectedCardList);
export default CardList;