"use strict";

function makeButtonElement(index, count, img, link) {
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

    const pageWidth = 700;

    const stride = 100;
    const duration = 8000;

    // the sum of the following two terms must be less than or equal to stride
    const leftwardOffset = 88;
    const initialRightwardOffset = 12;
    
    let distance = count * stride;
    if (distance - leftwardOffset < pageWidth) {
        count = Math.ceil((pageWidth + leftwardOffset) / stride);
        distance = count * stride;
    }
    const speed = distance / duration;
    const keyframes = [
        {
            transform: `translateX(${-leftwardOffset + distance}px)`
        },
        {
            transform: `translateX(${-leftwardOffset}px)`
        }
    ];
    element.animate(keyframes, {
        duration: duration,
        iterations: Infinity,
        easing: "linear",
        delay: -(duration / count * Number(count - index) - (leftwardOffset + initialRightwardOffset) / speed)
    });
    return element;
}

function makeButtonInfo(file, link) {
    return {
        file: file,
        link: link
    }
}

async function generateButtons() {
    const buttonInfos = [];

    const res = await fetch("/buttons/list.json");
    const buttonInfosJson = await res.json();
    for (const buttonInfoJson of buttonInfosJson) {
        buttonInfos.push(makeButtonInfo(
            `/buttons/${buttonInfoJson.file}`, buttonInfoJson["link"]
        ));
    }

    const buttonsElement = document.getElementById("buttons");
    if (buttonsElement == null)
        return;
    for (let i = 0; i < buttonInfos.length; i++) {
        let buttonInfo = buttonInfos[i];
        buttonsElement.insertAdjacentElement("beforeend", makeButtonElement(
            i, 7, buttonInfo.file, buttonInfo.link
        ));
    }
}

window.addEventListener("load", () => {
    generateButtons();
});