"use strict";

function makeBlogInfo(id, title, date) {
    return {
        id: id,
        title: title,
        date: date
    };
}

export function getBlogFilePath(id) {
    return `/blogs/${id}.txt`;
}

export const blogInfos = makeBlogInfos();

function makeBlogInfos() {
    const blogInfos = [
        makeBlogInfo("test", "Test a;dkfja;jadjkfbalkjd h ajkdkf", new Date(2024, 10, 15))
    ];
    const map = {};
    for (const blogInfo of blogInfos) {
        map[blogInfo.id] = blogInfo;
    }
    return map;
}