const defaultStore = {
	login: false,
	searchKeyword: '',
	userId: '',
}

const femtoApp = (state = defaultStore, action) => {
	console.log('store',state, action)
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
		default:
			return state
	}
}

export default femtoApp