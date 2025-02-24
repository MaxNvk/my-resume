export interface IWorkExperience {
  title: string;
  dates?: string;
  description: string | string[];
}

export const workExperiencesList: IWorkExperience[] = [
  {
    title: "Frontend Engineer | 14Four",
    dates: "Oct 2023 — Now",
    description: [
      "Developed and deployed high-performance, creative-focused web applications for top brands like Pepsi, Toyota, and Carmax, leveraging React.js (Next.js) and Vue.js (Nuxt.js) to deliver engaging digital experiences.",
      "Created and launched marketing campaign projects that reached 10,000+ users, driving brand engagement and user interactions through various front-end solutions and seamless UX design.",
      "Engineered complex JavaScript features independent of frameworks, enhancing application performance and ensuring consistent, high-quality experiences across multiple devices.",
      "Built dynamic, content-rich CMS platforms using Strapi and Craft CMS, enabling scalable and flexible content management for global marketing initiatives.",
      "Optimized web performance and accessibility by implementing WCAG standards, ensuring 100% compliance and improving usability for diverse audiences.",
      "Developed AI-enhanced backend features using Python (Flask) and Node.js (Nest.js), boosting API efficiency and enhancing system scalability.",
      "Led deployment and troubleshooting efforts for client environments, resolving JavaScript-related issues and delivering ongoing feature enhancements.",
      "Collaborated with cross-functional teams to ensure smooth integrations between front-end and backend components, maintaining high code quality and performance.",
      "Key Technologies: React.js (Next.js), Vue.js (Nuxt.js), JavaScript (ES6+), TypeScript, Tailwind, GSAP, Webpack, Vite, Python (Flask), Node.js (Nest.js), Strapi, Craft CMS, WCAG, WebSockets, Docker.",
    ],
  },
  {
    dates: "Apr 2021 — Oct 2023",
    title: "Frontend Engineer, Team Lead | Milan Art",
    description: [
      "Helped my client grow their platform to over 100,000 active users by designing and building a robust architecture that delivered a smooth user experience and real-time interactions with minimal lag.",
      "Architected and launched a social networking platform for artists completely from scratch, leveraging Vue.js (Nuxt.js), TypeScript, Composition API, and WebSockets to build a high-performance, scalable solution.",
      "Led the end-to-end development of ArtSocial, transforming conceptual ideas into a fully functional platform that enabled artists to connect, showcase their work, and interact in real-time.",
      "Integrated Stripe and other payment systems, enhancing the checkout experience with secure transactions, boosting user trust and engagement.",
      "Directed project timelines, team priorities, and stakeholder communication, ensuring on-time feature delivery and alignment with business objectives.",
      "Optimized front-end performance using Storybook, Tailwind, and Element UI, delivering a smooth, visually appealing, and responsive user experience.",
      "Key Technologies: Vue.js (Nuxt.js), TypeScript, Composition API, WebSockets, Node.js (Nest.js), Stripe, Docker, Tailwind, Element UI, CI/CD (Bitbucket Pipelines, CircleCI), MJML, Sentry.",
    ],
  },
  {
    dates: "Oct 2022 — Aug 2023",
    title: "Frontend Engineer | SPD Ukraine",
    description: [
      "Developed and maintained scalable web applications for multiple clients, leveraging React.js (Next.js), TypeScript, and modern UI frameworks.",
      "Designed and implemented dynamic, responsive UIs, ensuring seamless user experience across devices using React Query, React Hooks, and Ant Design.",
      "Collaborated with cross-functional teams, translating business requirements into high-quality, maintainable code that enhanced user engagement.",
      "Streamlined deployment processes by implementing best practices for code reviews, version control, and CI/CD workflows.",
      "Key Technologies: React.js (Next.js), TypeScript, React Query, React Hooks, Ant Design, Tailwind, Google Maps API, CI/CD, Web Performance Optimization.",
    ],
  },
  {
    dates: "Oct 2019 — Mar 2021",
    title: "Frontend Developer | Kilian business consulting GmbH",
    description: [
      "Developed an online store and personal UI cabinet for Kilian Business Consulting GmbH, creating a seamless user experience and increasing customer engagement.",
      "Conducted thorough code reviews, optimized existing code, and debugged errors.",
      "Utilized a tech stack that included Vue.js, Vuex, HTML, SCSS, Bulma, and Gridsome.",
    ],
  },
  {
    dates: "Apr 2017 — Apr 2021",
    title: "Frontend Developer, Frontend Lead | Empat",
    description: [
      "Responsible for the development of several CRM systems using Vue.js and React.js, streamlining business processes and enhancing user experience for clients.",
      "Developed over 20 websites using Drupal and WordPress CMS systems, catering to diverse industries and client requirements.",
      "Utilized a diverse tech stack, including JavaScript, Vue.js, React.js, Next.js, HTML, CSS, jQuery, PHP, WordPress, Grunt, Vuex, Nuxt.js, Webpack, Gulp, Bootstrap, Bulma, and Vuetify.",
    ],
  },
];
