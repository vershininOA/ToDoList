import { createSelector } from "reselect";
import {
	SHOW_ALL,
	SHOW_DONE,
	SHOW_NEED_DONE
} from "../constants/types"

const Cards = (state) => {
	return state.data;
};

export const showCardsState = (state) => {
	return state.showCardsState;
};

export const FilterDeletedState = (state) => {
	return state.filterDeleted;
};

export const FilterDoneState = (state) => {
	return state.filterDone;
};

export const FilterNeedDoneState = (state) => {
	return state.filterNeedDone;
};

export const getMarkFlag = (state) => {
	let flag = false;

	let tmpData = state.data.filter(item => { return !item.deleted });
	flag = tmpData.reduce(
		(currentDoneFlag, item) => (item.done && currentDoneFlag),
		true
	);

	return flag
};

export const VisibleCards = createSelector(
	[showCardsState, Cards, FilterDeletedState, FilterDoneState, FilterNeedDoneState],
	(st, cds, fDel, fDone, fNeedDone) => {
		switch (st) {
			case SHOW_ALL: {
				return cds.filter(item => (item.deleted === fDel));
				// break;
			}

			case SHOW_DONE: {
				return cds.filter(item => (item.deleted === fDel && item.done === fDone));
				// break;
			}

			case SHOW_NEED_DONE: {
				return cds.filter(item => (item.deleted === fDel && item.done === !fNeedDone));
				// break;
			}

			default:
				return cds;
		}
	}
);