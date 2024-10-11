function makeNavigationInfo(page, display) {
    return {
        page: page,
        display: display
    }
}

function generateNavigationBar() {
    const navigationLinks = [
        makeNavigationInfo("index.html", "Home"),
        makeNavigationInfo("programming.html", "Programming stuff")
    ]
    const page = window.location.pathname.split("/").pop();
    let navElement = document.getElementById("navigation");
    for (const navigationInfo of navigationLinks) {
        if (navigationInfo.page === page) {
            let htmlStr = "<div>";
            htmlStr += navigationInfo.display;
            htmlStr += "</div>";
            navElement.insertAdjacentHTML("beforeend", htmlStr);
        } else {
            let htmlStr = "<div class=\"differentPage\" onClick=\"location.href = '";
            htmlStr += navigationInfo.page;
            htmlStr += "';\">";
            htmlStr += navigationInfo.display;
            htmlStr += "</div>";
            navElement.insertAdjacentHTML("beforeend", htmlStr);
        }
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