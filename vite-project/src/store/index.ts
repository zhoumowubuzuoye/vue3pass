import { createPinia } from "pinia";
import persist from "pinia-plugin-persistedstate";

const store = createPinia().use(persist);
export default store;

export * from "./modules/user";
export * from "./modules/consult";
