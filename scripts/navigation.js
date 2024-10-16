"use strict";

function makeNavigationInfo(page, display) {
    return {
        page: page,
        display: display
    };
}

function generateNavigationBar() {
    const navigationLinks = [
        makeNavigationInfo("index", "Home"),
        makeNavigationInfo("programming", "Programming stuff"),
        makeNavigationInfo("blog-list", "Blogs")
    ];
    let page = window.location.pathname;
    if (page.startsWith("/"))
        page = page.substring(1, page.length);
    if (page.endsWith(".html"))
        page = page.substring(0, page.length - 5);
    if (page.length === 0)
        page = "index";
    let navElement = document.getElementById("navigation");
    if (navElement == null)
        return;
    for (const navigationInfo of navigationLinks) {
        const element = document.createElement("div");
        const textNode = document.createTextNode(navigationInfo.display);
        element.appendChild(textNode);
        if (navigationInfo.page === page) {
            element.setAttribute("class", "same-page");
        } else {
            let onClickAttrib = "location.href = '";
            onClickAttrib += navigationInfo.page + ".html";
            onClickAttrib += "';";
            element.setAttribute("onClick", onClickAttrib);
        }
        navElement.insertAdjacentElement("beforeend", element);
    }
}

window.addEventListener("load", () => {
    generateNavigationBar();
});