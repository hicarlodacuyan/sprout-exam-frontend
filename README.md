# frontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### BONUS QUESTIONS: 

If we are going to deploy this on production, what do you think is the next improvement that you will prioritize next?``````

```
- Add storybook for component documentation
- Add unit tests with vitest 
- Add e2e tests with playwright
- Add CI/CD pipeline with Github Actions
- Apply the below folder structure to organize the codebase
/src
|-- /assets
|   |-- /images
|   |-- /styles
|
|-- /core
|   |-- /components
|   |   |-- BaseButton.vue
|   |   |-- BaseIcon.vue
|   |-- /models
|   |-- /store
|   |-- /services
|   |-- /views
|   |   |-- DefaultLayout.vue
|   |   |-- AdminLayout.vue
|   |-- /utils
|   |   |-- validators.ts
|
|-- /modules
|   |-- /employees
|   |   |-- /components
|   |   |   |-- EmployeeForm.vue
|   |   |   |-- EmployeeList.vue
|   |   |-- /models
|   |   |   |-- Employee.ts
|   |   |-- /store
|   |   |   |-- employeeStore.ts
|   |   |-- /services
|   |   |   |-- employeeService.ts
|   |   |-- /views
|   |   |   |-- DashboardPage.vue
|   |   |   |-- EmployeeDetailPage.vue
|   |   |-- /tests
|   |   |   |-- employeeTests.spec.ts
|   |-- /auth
|   |   |-- /components
|   |   |   |-- LoginForm.vue
|   |   |   |-- RegisterForm.vue
|   |   |-- /models
|   |   |-- /store
|   |   |   |-- authStore.ts
|   |   |-- /services
|   |   |   |-- authService.ts
|   |   |-- /views
|   |   |   |-- LoginPage.vue
|   |   |   |-- RegisterPage.vue
|   |   |-- /tests
|   |   |   |-- authTests.spec.ts
|
|-- /scss
|   |-- main.scss
|
|-- /tests
|   |-- ...
|
|-- /plugins
|   |-- translate.ts
|
|-- App.vue
|-- main.ts
|-- router.ts
|-- store.ts
|-- shims-vue.d.ts
```

Currently, the styling of the application is very basic. I would like to improve the styling of the application by adding a CSS library and framework like TailwindCSS or ShadCN. This will help in making the application more visually appealing and user-friendly. Additionally, I would also like to incorporate a design system to maintain consistency in the UI components and styles across the application. This will help in improving the overall user experience and branding of the application.
