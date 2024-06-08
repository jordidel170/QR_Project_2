import loginDispatcher from "./dispatcherLogin";
import signupDispatcher from "./dispatcherSignup";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			register: null,
			
		},
		actions: {
		
			syncTokenSessionStore: () => {
                const token = sessionStorage.getItem("token");
                if (token) {
                    setStore({ token: token });
                }
            },
            getTokenLogin: async (email, password) => {
                const token = await loginDispatcher(email, password);
                if (token) {
                    sessionStorage.setItem("token", token);
                    setStore({ token: token })}},

			handleLogOut: () => {
				sessionStorage.removeItem("token")
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
