"use strict";

import { getBlogInfos, getBlogFilePath } from "./blog-common.js";

import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

async function generateBlogContent() {
    const urlParam = new URLSearchParams(window.location.search);
    if (!urlParam.has("id"))
        window.location.replace("/index.html");
    const id = urlParam.get("id");
    
    const blogInfos = await getBlogInfos();
    const blogInfo = blogInfos[id];

    if (blogInfo == undefined)
        window.location.replace("/index.html");
    
    const blogContentElement = document.getElementById("blog-content");
    if (blogContentElement == null)
        return;

    document.title = `${blogInfo.title} - cece`;

    const blogContent = document.getElementById("blog-content");
    
    const titleElement = document.createElement("h1");
    const titleTextNode = document.createTextNode(blogInfo.title);
    titleElement.appendChild(titleTextNode);
    blogContent.insertAdjacentElement("beforeend", titleElement);

    const dateElement = document.createElement("div");
    dateElement.setAttribute("class", "date");
    const dateTextNode = document.createTextNode(
        `Created on: ${blogInfo.date.getMonth()}/${blogInfo.date.getDay()}/${blogInfo.date.getFullYear()}`
    );
    dateElement.appendChild(dateTextNode);
    blogContent.insertAdjacentElement("beforeend", dateElement);

    const res = await fetch(getBlogFilePath(id));
    const content = await res.text();
    const contentElement = marked.parse(content);
    blogContent.insertAdjacentHTML("beforeend", contentElement);
}

window.addEventListener("load", () => {
    generateBlogContent();
});