# Pokemon Infinite Scroll Demo

The goal of this personal project is to create a web application that utilizes the concept of infinite scrolling. Infinite scrolling is an interaction design pattern where content loads continuously as the user scrolls down the page, allowing the user to explore a large amount of content. This design pattern is often used on social media platforms and feeds where content has no definite end.

## Project Overview

This project is built with:

<table cellpadding="0" cellspacing="0">
  <tr style="padding: 0">
    <td valign="top" align="center">
        <img src="https://github.com/rayandus/my-portfolio/blob/main/public/reactjs.svg" width="50" height="50">
        <br />
        Reactjs
    </td>
    <td valign="top" align="center">
        <img src="https://github.com/rayandus/my-portfolio/blob/main/public/redux.svg" width="50" height="50">
        <br />
        Redux
    </td>
    <td valign="top" align="center">
        <img src="https://github.com/rayandus/my-portfolio/blob/main/public/javascript.svg" width="50" height="50">
        <br />
        Javascript
    </td>
    <td valign="top" align="center">
        <img src="https://github.com/rayandus/my-portfolio/blob/main/public/material-ui.svg" width="50" height="50">
        <br />
        Material UI
    </td>
  </tr>
</table>

This app fetches data from [Pokemon API](https://pokeapi.co/)

## Set-up Prerequisite

1. Node Version Manager (nvm)
1. Yarn

## Setup

1. Clone [infinite-scroll-demo](git@github.com:rayandus/infinite-scroll-demo.git) repo in your local

1. Go to project root directory and install

   ```bash
   cd infinite-scroll-demo
   git checkout main
   nvm install
   yarn install
   ```

1. Start the application

   ```bash
   yarn start
   ```

   > The app will run on port `3000`. E.g. `http://localhost:3000`

   or

   ```bash
   PORT=3000 pnpm start:dev
   ```

   > Just replace `PORT=3000` to your choice of port
