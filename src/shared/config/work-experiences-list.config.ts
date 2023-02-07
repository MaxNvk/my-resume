export interface IWorkExperience {
  title: string;
  description: string;
  techStack: string;
}

export const workExperiencesList: IWorkExperience[] = [
  {
    title: "Milan Art Institute | April 2021 - Present",
    description:
      "My primary responsibilities is development of social network platform frontend part and admin panel for it from scratch.",
    techStack:
      "Vue.js, Nuxt.js, SSR, Composition API, TypeScript, WebSocket, Element UI, React.js, Next.js.",
  },
  {
    title: "Kilian business consulting GmbHv | October 2019 - March 2021",
    description:
      "Was responsible for development of customer personal cabinet UI, estimating of features development, code review.",
    techStack: "Vue.js, Vuex, Gridsome, Bootstrap.",
  },
  {
    title: "Empat | June 2018 - April 2021",
    description:
      "Was responsible for development of CRM systems on Vue.js, development of websites with Drupal/Wordpress CMS systems, estimation of new projects, support of existing projects mentoring of trainee engineers.",
    techStack:
      "Vue.js, Nuxt.js, Vuex, React.js, Next.js, Redux, Gulp, Webpack, JQuery, PHP, Wordpress.",
  },
  {
    title: "Schrödinger's Cat Laboratory | April 2017 – June 2018",
    description:
      "My primary tasks was development of landing pages, UI part of e-commerce websites, corporative websites.",
    techStack: "HTML, Grunt, LESS, SCSS, CSS, JS, JQuery.",
  },
];
