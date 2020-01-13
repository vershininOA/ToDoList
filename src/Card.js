import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	doneCard,
	deleteCard,
	changeCardText
} from './actions/card'

function mapDispatchToProps(dispatch) {
	return {
		doneCard: (id) => dispatch(doneCard(id)),
		deleteCard: (id) => dispatch(deleteCard(id)),
		changeCardText: (ev) => dispatch(changeCardText(ev))
	}
}

class ConnectedCard extends Component {
	render() {
		const {
			deleted,
			done,
			todoId,
			todoText,
		} = this.props;

		let useStyle = "";

		if (deleted) {
			if (done) {
				useStyle = "cardItemDeletedDone"
			} else useStyle = "cardItemDeleted"
		} else if (done) useStyle = "cardItemDone";

		return (
			<div className="cardBox">
				<div className="card cardItem">
					<div className={useStyle}>
						<div className="card-body">
							<p className="card-text">
								<textarea
									id={todoId}
									className="cardTextarea"
									rows="3"
									disabled={deleted}
									value={todoText}
									onChange={(event) => this.props.changeCardText(event.target)}
								/>
							</p>
						</div>

						<div className="cardBottomArea">
							<div className="cardBottomCheckboxArea">
								<label>
									<input
										type="checkbox"
										disabled={deleted}
										checked={done}
										onChange={() => this.props.doneCard(todoId)}
									/>
									Готово
								</label>
							</div>

							<div className="cardButtonDeleteArea">
								<button
									className="btn btn-primary"
									onClick={() => this.props.deleteCard(todoId)}
									style={{ "float": "right" }}
								>
									{deleted
										? "Восстановить"
										: "Удалить"
									}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const Card = connect(null, mapDispatchToProps)(ConnectedCard);

export default Card;

