# vue-next vue-router-next webpack typescript example

> Minimal POC with vue3 and webpack 4

Note that if you are using VSCode, Vetur isn't updated to take advantage of Vue 3's typing yet so intellisense in Vue files may not be fully functional (especially in templates).
For this reason I recommend you structure your code in separate files (.vue for html templates only, .js, .ts and .scss) as you can see I did for the mbutton component.

### Prerequisites
- Node & Yarn (or npm)
- XCode (if on MacOS) -- run `xcode-select --install` after opening XCode

  Catalina OS: open XCode, go to Preferences -> Location and select the Command Line Tools (it is probably empty, select your version there)

### Install
```sh
yarn
```
### Usage
##### Develop
```sh
# run dev server at localhost:8080
yarn dev
```
##### Build
```sh
# transpile js for prod deployment
yarn build
```

## Explanatory notes

First of all, here is a very good cheatsheet for vue3, i really recommend you look at it for a minute before diving into this repository:

https://www.vuemastery.com/pdf/Vue-3-Cheat-Sheet.pdf


The code for vue3 is significantly different than what you would build for vue version 2, so let's go step by step through the file structure:

1. Build tools

I've gathered all the build scripts inside the `build` folder, with webpack 4 as the build tool. You can choose to go with rollup instead or later on get rid of the build tool alltogether, as node will soon implement the ES2020 standard.

2. Configuration

The `config` folder is where you configure what environment variables you want to have access to in the Vue scripts.

3. Assets

The `src/assets` contains all our images, fonts, icons, etc.

4. Components

The application has two important concepts: the Page and the Component. You build a Page for each page of the application, obviously. Inside the page, you assemble various Components. There are two reasons why you wouldn't just write everything on the Page level and be done with it:

  - You want your code to read easier, so you replace large blocks of HTML, CSS and JS with much simpler, maybe one line code blocks, much like you would simply say "house" instead of saying "a construction with four walls, 1m by 1m windows made of glass, and an internal partitioning done with more walls, without windows". You get the idea.
  - You may need to use similar code in different pages, for example when showing a user avatar in various places. 

The `src/components` in this Proof of Concept has two components: the `mbutton` and the `barchart`. I've written the `mbutton` with source separation, while the `barchart` is a vue file that combines HTML, CSS and TS together. Personally I prefer separation of sources for a few reasons, the most important being that my code editor is a lot faster when not having to lint and syntax highlight based on 3 different engines.

The `src/pages` has of course two pages, named as `Login` and `Chart`.

5. Bootstrap

The whole application is bootstrapped by using the `index.html`, `App.vue` and `main.ts` files together, to produce the starting point of this app.
