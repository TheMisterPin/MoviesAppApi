// const namespace = 'https://Moviehub.dev/' 
// const backendUrl = 'http://localhost:2323/incomingtoken' 
// const axios = require('axios')
 
// exports.onExecutePostLogin = async (event, api) => {
// 	if (event.authorization) {
// 		let username = event.user.username
// 		if (!username) {
// 			username = generateUsername()
// 		}

// 		api.idToken.setCustomClaim(`${namespace}movies_uploaded`, event.user.movies_uploaded_ref || [])
// 		api.idToken.setCustomClaim(`${namespace}watch_list`, event.user.watch_list_ref || [])
// 		api.idToken.setCustomClaim(`${namespace}username`, username)
// 		api.idToken.setCustomClaim(`${namespace}password`, event.user.password || 'not specified')
// 		api.idToken.setCustomClaim(`${namespace}profile_picture`, event.user.picture)

// 		const userData = {
// 			username: event.user.username || username,
// 			email: event.user.email,
// 			movies: event.user.movies_uploaded_ref,
// 			id: event.user.userId // Assuming this is correctly populated
// 		}

// 		try {
// 			const response = await axios.post(backendUrl, userData, {
// 				headers: {
// 					'Content-Type': 'application/json',
// 					'Authorization': `Bearer ${event.authorization.access_token}`
// 				}
// 			})

// 			if (response.status !== 200) {
// 				console.error('Error sending user data to backend:', response.status, response.statusText)
// 			}
// 		} catch (error) {
// 			console.error('Error in POST request to backend:', error)
// 		}
// 	}}
