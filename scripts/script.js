function makeNavigationInfo(page, display) {
    return {
        page: page,
        display: display
    }
}

function generateNavigationBar() {
    const navigationLinks = [
        makeNavigationInfo("index", "Home"),
        makeNavigationInfo("programming", "Programming stuff")
    ];
    let page = window.location.pathname;
    if (page.startsWith("/"))
        page = page.substring(1, page.length);
    if (page.endsWith(".html"))
        page = page.substring(0, page.length - 5);
    if (page.length === 0)
        page = "index";
    let navElement = document.getElementById("navigation");
    for (const navigationInfo of navigationLinks) {
        const element = document.createElement("div");
        const textNode = document.createTextNode(navigationInfo.display);
        element.appendChild(textNode);
        if (navigationInfo.page === page) {
            element.setAttribute("class", "samePage");
        } else {
            let onClickAttrib = "location.href = '";
            onClickAttrib += navigationInfo.page + ".html";
            onClickAttrib += "';";
            element.setAttribute("onClick", onClickAttrib);
        }
        navElement.insertAdjacentElement("beforeend", element);
    }
}

function makeButton(index, img, link) {
    const imgElement = document.createElement("img");
    imgElement.setAttribute("src", img);
    imgElement.setAttribute("class", "button");
    let element = imgElement;
    if (link != null) {
        const parent = document.createElement("a");
        parent.setAttribute("href", link);
        parent.appendChild(imgElement);
        element = parent;
    }
    const keyframes = [
        {
            transform: "translateX(600px)"
        },
        {
            transform: "translateX(-100px)"
        }
    ]
    element.animate(keyframes, {
        duration: 5000,
        iterations: Infinity,
        easing: "linear",
        delay: -(5000.0 / 7.0 * Number(index + 1))
    });
    return element;
}

function makeButtonInfo(gif, link) {
    return {
        gif: gif,
        link: link
    }
}

function generateButtons() {
    const buttonInfos = [
        makeButtonInfo("buttons/acab.gif"),
        makeButtonInfo("buttons/linux.gif"),
        makeButtonInfo("buttons/sheher.png"),
        makeButtonInfo("buttons/aubrey.png", "https://aubrey.rs/"),
        makeButtonInfo("buttons/foobar2000.gif"),
        makeButtonInfo("buttons/cocksuckingfaggot.gif"),
        makeButtonInfo("buttons/click_here.gif", "https://www.reddit.com/r/GWASapphic/")
    ];
    const buttonDisplay = document.getElementById("buttonDisplay");
    for (let i = 0; i < buttonInfos.length; i++) {
        let buttonInfo = buttonInfos[i];
        buttonDisplay.insertAdjacentElement("beforeend", makeButton(i, buttonInfo.gif, buttonInfo.link));
    }
}

window.onload = function() {
    generateNavigationBar();
    generateButtons();
}