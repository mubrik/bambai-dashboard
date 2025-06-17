# Bambai StyleGuide

- [Bambai StyleGuide](#bambai-styleguide)
  - [Introduction](#introduction)
  - [Basics](#basics)
  - [Server Components / Functions](#server-components--functions)
  - [Destructuring](#destructuring)
  - [Api Calls](#api-calls)
  - [Package handling](#package-handling)
  - [Git Usage](#git-usage)

## Introduction

A styleguide for the Bambai Plus Dashboard Web app

This style guide purpose is to help apply and track practices that are standard for the development of the Bambai Plus Dashboard Web app.
This guide doesn't focus much on the how to but on the what to so as to make development flow as succinct as possible.

## Basics

- Comments should be used sparringly and purposefully.

```js
// good

// comment explaining complicated logic, puzzling logic, regex etc
// eslint comment
// semgrep comment

// bad
// one word comments
// empty comments
```

- Filenames should ideally be in camelCase, Component names in PascalCase
- Constants defined in the `src/constants` directory should be in ALL CAPS

```js
// good
testFile.ts
newFile.ts
const NewComponent = () => {};
`in src/constants`
const NEW_CONSTANT = {};

// bad
TFile.ts
const newcomponent = () => {};
`in src/constants`
const constant_new = {};
```

- Inline functions are preferred. If a function isn't async and only used once, prefer to inline it.

```js
// good
<MUIButton
    onClick={() => {
        // do some action
    }}
/>

// bad, used only once
const handleContinue = () => {
    // do some action
};

<MUIButton
    onClick={handleContinue}
/>
```

## Server Components / Functions

- For server components try to either include the `use server` directive and naming could include the word Server e.g `<PagesServer />` or `<SchoolsListServer />`
- For client components, include the `use client` directive, naming can be as usual e.g `<SchoolsList />`

## Destructuring

- Always prefer to destructure whenever possible

```js
// good
const { data } = useAuthUser();
const {t} = useSomeContext();

// bad
const a = useContext(AnalyticsContext);
const notif = useSomeContext();
a.data;
notif.someFunc()
```

## Api Calls

- All Endpoint URLs must be grouped and added to `src/constants/endpoints`
- Create new queries/mutations as required at `src/api`
- Queries should be grouped relatively by their section e.g auth queries/mutations in `src/api/auth.ts`, while school queries/mutations should be in `src/api/school.ts`
- If the API/Request isn't used more than once, it's okay to simply use `useFetchOptsInternal/useMutationInternal` without creating new queries at `src/api`
- Prefer to use tanstack query over creation nextjs server actions

```js
// good
export function useUsers() {
  return useFetchInternal({
    queryKey: QUERY_KEYS.USERS.ALL,
    url: '/users',
    errorMsg: 'Failed to fetch users',
  });
}

// good
import useInternalFetch from "api";
import { API_ENDPOINTS } from '@endpoints';

const { data } = useInternalFetch({ queryKey: ['some key'], url: API_ENDPOINTS.instance.BASE });

// bad
export function useUsers() {
  return useFetchInternal({
    queryKey: 'query as a string',
    url: 'endpoint as a string',
    errorMsg: 'Failed to fetch users',
  });
}
const { data } = useInternalFetch({ queryKey: ['some key'], url: 'endpoint as a string' });
```


## Package handling

- New packages to be installed should be added only when deemed absolutely necessary to avoid unnecessary overhead/maintenance.
- When adding a new package, version number should be specific.

```js
// good
"axios": "4.2.1"

// bad
"axios": "^4.2.1",
"axios": "~4.2.1",
```

## Git Usage

- Branch naming is flexible but best to keep it related to the requested feature/issue/bug
- When a branch is ready for merge, squash all commits to a single one. The commit message should be succinct and similar to the branch name
- Run prettier to format your code before creatig branch
