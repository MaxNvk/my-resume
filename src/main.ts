import { ViteSSG } from "vite-ssg/single-page";
import App from "./App.vue";
import "./assets/styles/index.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons/faPhone";
import { faTelegramPlane } from "@fortawesome/free-brands-svg-icons/faTelegramPlane";
import { faAt } from "@fortawesome/free-solid-svg-icons/faAt";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { router } from "./router";

library.add(faPhone, faAt, faTelegramPlane, faLinkedin);

export const createApp = ViteSSG(App, ({ app }) => {
  app.component("font-awesome-icon", FontAwesomeIcon);
  app.use(router);
});
