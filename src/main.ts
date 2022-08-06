import { ViteSSG } from "vite-ssg/single-page";
import App from "./App.vue";
import "./assets/styles/index.scss";

export const createApp = ViteSSG(App);
