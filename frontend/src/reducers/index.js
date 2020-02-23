const defaultStore = {
	login: false
}

const femtoApp = (state = defaultStore, action) => {
	console.log(state, action)
	switch (action.type) {
		case 'SET_LOGIN':
			return {
				...state,
				login: action.login
			}
		default:
			return state
	}
}

export default femtoApp