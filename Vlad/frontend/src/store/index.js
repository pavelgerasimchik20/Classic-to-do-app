import { createStore } from "vuex";
import todo from "./modules/todo";
import user from "./modules/user";

const store = createStore({
    modules: {
        todo,
        user
    }
});

export default store;
