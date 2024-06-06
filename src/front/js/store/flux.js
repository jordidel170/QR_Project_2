import loginDispatcher from "./dispatcherLogin";
import signupDispatcher from "./dispatcherSignup";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			register: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
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
			
			getUserRegister: async(email, password) => {
				const data = await signupDispatcher(email,password);
				console.log(data)
				return data;
			},

			
		
		}
	};
};

export default getState;
