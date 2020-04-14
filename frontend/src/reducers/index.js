const defaultStore = {
	login: false,
	searchKeyword: '',
	userId: '',
	username: '',
}

const femtoApp = (state = defaultStore, action) => {
	switch (action.type) {
		case 'SET_LOGIN':
			return {
				...state,
				login: action.login
			}
		case 'SET_SEARCH_KEYWORD':
			return {
				...state,
				searchKeyword: action.searchKeyword
			}
		case 'SET_USERID':
			return {
				...state,
				userId: action.userId
			}
		case 'SET_USERNAME':
			return {
				...state,
				username: action.username
			}
		default:
			return state
	}
}

export default femtoApp