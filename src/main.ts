import { ViteSSG } from "vite-ssg/single-page";
import App from "./App.vue";
import "./assets/styles/index.scss";
import { dom, library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTelegramPlane } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faAt } from "@fortawesome/free-solid-svg-icons";

library.add(faPhone, faAt, faTelegramPlane);

dom.watch();

export const createApp = ViteSSG(App, ({ app }) => {
  app.component("font-awesome-icon", FontAwesomeIcon);
});
