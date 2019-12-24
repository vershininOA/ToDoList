import React, { Component } from 'react';

class Card extends Component {
	render () {
		const { 
				deleted, 
				done, 
				todoId, 
				todoText,
				changeCardState,
				changeCardText,
			} = this.props;
		
			let useStyle = "";

		if (deleted) {
			if (done) {
				useStyle = "cardItemDeletedDone"
			} else useStyle = "cardItemDeleted"
		} else if (done) useStyle = "cardItemDone"

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
									onChange={ (event) => changeCardText(event) } 
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
											onChange={() => changeCardState(todoId, "done")}
									/>
									Готово 
								</label>
							</div>

							<div className="cardButtonDeleteArea">
								<button 
									className="btn btn-primary"
									onClick={ () => changeCardState(todoId, "deleted") }
									style={{"float":"right"}}
								>
									{deleted
										?	"Восстановить"
										:	"Удалить"
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

export default Card;

