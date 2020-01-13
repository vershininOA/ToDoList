import {
	CARD_ADD,
	CARD_DONE,
	CARD_DELETE,
	CARD_CHANGE_TEXT
} from "../constants/types";

export const addCard = (cardText) => ({
	type: CARD_ADD,
	todoText: cardText
});

export const deleteCard = (todoId) => ({
	type: CARD_DELETE,
	id: todoId
});

export const doneCard = (todoId) => ({
	type: CARD_DONE,
	id: todoId
});

export const changeCardText = (evTarget) => ({
	type: CARD_CHANGE_TEXT,
	target: evTarget
});
