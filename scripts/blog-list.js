"use strict";

import { blogInfos, getBlogFilePath } from "./blog-common.js";

import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

function generateBlogList() {
    const blogListElement = document.getElementById("blog-list");
    if (blogListElement == null)
        return;
    const blogLoadingPromises = [];
    for (const id in blogInfos) {
        const blogInfo = blogInfos[id];
        ((blogInfo) => {
            blogLoadingPromises.push(
                fetch(getBlogFilePath(blogInfo.id))
                .then((res) => res.text())
                .then((content) => ({
                    blogInfo: blogInfo,
                    blogContent: content,
                }))
            );
        })(blogInfo);
    }
    Promise.all(blogLoadingPromises)
    .then((contents) => {
        for (const content of contents) {
            const blogInfo = content.blogInfo;

            const entryElement = document.createElement("div");
            entryElement.setAttribute("class", "entry");
            entryElement.setAttribute(
                "onclick", `location.href = '/blog-content.html?id=${blogInfo.id}';`
            );
            
            const titleElement = document.createElement("div");
            titleElement.setAttribute("class", "title");
            const titleTextNode = document.createTextNode(blogInfo.title);
            titleElement.appendChild(titleTextNode);
            entryElement.appendChild(titleElement);

            const dateElement = document.createElement("div");
            dateElement.setAttribute("class", "date");
            const dateTextNode = document.createTextNode(
                `${blogInfo.date.getMonth()}/${blogInfo.date.getDay()}/${blogInfo.date.getFullYear()}`
            );
            dateElement.appendChild(dateTextNode);
            entryElement.appendChild(dateElement);

            const parsedBlogContent = marked.parse(content.blogContent);
            let displayText = parsedBlogContent.replace(/<[^>]*>/g, '').substring(0, 200);
            if (content.blogContent.length > displayText.length)
                displayText += "...";
            const previewElement = document.createElement("div");
            previewElement.setAttribute("class", "preview");
            const previewTextNode = document.createTextNode(displayText);
            previewElement.appendChild(previewTextNode);
            entryElement.appendChild(previewElement);

            blogListElement.insertAdjacentElement("beforeend", entryElement);
        }
    });
}

window.addEventListener("load", () => {
    generateBlogList();
});