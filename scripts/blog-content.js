"use strict";

import { blogInfos, getBlogFilePath } from "./blog-common.js";

function generateBlogContent() {
    const urlParam = new URLSearchParams(window.location.search);
    if (!urlParam.has("id"))
        window.location.replace("/index.html");
    const id = urlParam.get("id");
    const blogInfo = blogInfos[id];
    
    const blogContentElement = document.getElementById("blog-content");
    if (blogContentElement == null)
        return;

    const blogContent = document.getElementById("blog-content");
    
    const titleElement = document.createElement("h1");
    const titleTextNode = document.createTextNode(blogInfo.title);
    titleElement.appendChild(titleTextNode);
    blogContent.insertAdjacentElement("beforeend", titleElement);

    fetch(getBlogFilePath(id))
    .then((res) => res.text())
    .then((content) => {
        const contentElement = document.createElement("p");
        const contentTextNode = document.createTextNode(content);
        contentElement.appendChild(contentTextNode);
        blogContent.insertAdjacentElement("beforeend", contentElement);
    });
}

window.addEventListener("load", () => {
    generateBlogContent();
});