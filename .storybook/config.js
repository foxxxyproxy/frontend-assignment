import { configure } from "@storybook/react";
import "../src/styles/index.css";

const req = require.context("../src", true, /\.stories.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
