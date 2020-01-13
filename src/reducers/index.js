import {
	CARD_ADD,
	CARD_DELETE,
	CARD_DONE,
	CARD_CHANGE_TEXT,
	CARD_CLEAR_DELETED
} from '../constants/types.js';

import {
	SHOW_ALL,
	SHOW_DONE,
	SHOW_NEED_DONE,
	SET_FILTER_DELETED,
	SET_FILTER_DONE,
	SET_FILTER_NEED_DONE, CARD_MARK_ALL, CARD_UNMARK_ALL
}
	from "../constants/types";

import Data from "../Data";

const getMaxCardId = () => {
	let maxId = Data.reduce(
		(currentMaxId, item) => (item.todoId > currentMaxId) ? item.todoId : currentMaxId,
		0
	);
	return maxId;
};

const initialState = {
	data: Data,
	showCardsState: SHOW_ALL,
	maxId: getMaxCardId(),
	filterDone: false,
	filterNeedDone: false,
	filterDeleted: false,
	flag: false
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_FILTER_DELETED: {
			let fd = !state.filterDeleted;
			return {
				...state,
				filterDeleted: fd
			}
		}

		case SET_FILTER_DONE: {
			let fd = !state.filterDone;
			let newShowState;

			(fd) ? newShowState = SHOW_DONE : newShowState = SHOW_ALL;

			return {
				...state,
				showCardsState: newShowState,
				filterDone: fd,
				filterNeedDone: false
			}
		}

		case SET_FILTER_NEED_DONE: {
			let fd = !state.filterNeedDone;
			let newShowState;

			(fd) ? newShowState = SHOW_NEED_DONE : newShowState = SHOW_ALL;

			return {
				...state,
				showCardsState: newShowState,
				filterDone: false,
				filterNeedDone: fd
			}
		}

		case CARD_ADD: {
			let newData = state.data.map(item => { return item });
			let maxId = state.maxId + 1;

			newData.unshift({
				"todoId": maxId,
				"todoText": action.todoText,
				"done": false,
				"deleted": false
			});

			return {
				...state,
				maxId: maxId,
				data: newData
			};
		}

		case CARD_DELETE: {
			let newData = state.data.map((item) => {
				if (item.todoId === action.id) item.deleted = !item.deleted;
				return item;
			});

			return {
				...state,
				data: newData
			};
		}

		case CARD_DONE: {
			let newData = state.data.map((item) => {
				if (item.todoId === action.id) item.done = !item.done;
				return item;
			});

			return {
				...state,
				data: newData
			};
		}

		case CARD_CHANGE_TEXT: {

			let newData = state.data.map((item) => {
				if (item.todoId.toString() === action.target.id.toString()) {
					item.todoText = action.target.value;
				}

				return item
			});

			return {
				...state,
				data: newData
			}
		}

		case CARD_CLEAR_DELETED: {
			let newData = state.data.filter(item => { return !item.deleted });

			return {
				...state,
				data: newData
			}
		}

		case CARD_MARK_ALL: {
			let newData = state.data.map(item => {
				if (!item.deleted) item.done = true;
				return item
			});

			return {
				...state,
				data: newData
			}
		}

		case CARD_UNMARK_ALL: {
			let newData = state.data.map(item => {
				if (!item.deleted) item.done = false;
				return item
			});

			return {
				...state,
				data: newData
			}
		}

		default: return state;
	}
};

export default rootReducer;