import loginDispatcher from "./dispatcherLogin";
import signupDispatcher from "./dispatcherSignup";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			register: null,
			
		},
		actions: {
		
			
            getTokenLogin: async (email, password) => {
                const {access_token} = await loginDispatcher(email, password);
                if (access_token) {
                    localStorage.setItem("token", access_token);
                    setStore({ token: access_token })}},
			
			syncTokenLocalStorage: () => {
				const token = localStorage.getItem("token");
					if (token) {
					setStore({ token: token });
						}
					},

			handleLogOut: () => {
				localStorage.removeItem("token")
				console.log("Loging out")
				const store = setStore()
				setStore({...store, token: null})
			},
			
			getUserRegister: async(restaurantName,firstName, LastName,email, password) => {
				const data = await signupDispatcher(restaurantName,firstName, LastName, email,password);
				console.log(data)
				return data;
			},

			
		
		}
	};
};

export default getState;
