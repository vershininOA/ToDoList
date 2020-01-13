import {
	SET_FILTER_DELETED,
	SET_FILTER_DONE,
	SET_FILTER_NEED_DONE,
	CARD_CLEAR_DELETED,
	CARD_MARK_ALL,
	CARD_UNMARK_ALL
} from "../constants/types"

export const setFilterDeletedState = () => ({
	type: SET_FILTER_DELETED
});

export const setFilterDoneState = () => ({
	type: SET_FILTER_DONE
});

export const setFilterNeedDoneState = () => ({
	type: SET_FILTER_NEED_DONE
});

export const clearDeletedCards = () => ({
	type: CARD_CLEAR_DELETED
});

export const cardMarkAll = () => ({
	type: CARD_MARK_ALL
});

export const cardUnMarkAll = () => ({
	type: CARD_UNMARK_ALL
});