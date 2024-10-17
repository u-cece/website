"use strict";

function makeBlogInfo(id, title, date) {
    return {
        id: id,
        title: title,
        date: date
    };
}

export function getBlogFilePath(id) {
    return `/blogs/${id}.md`;
}

let blogInfos = null;

export async function getBlogInfos() {
    if (blogInfos == null) {
        const res = await fetch("/blogs/list.json");
        const blogInfosJson = await res.json();
    
        const map = {};
        for (const blogInfoJson of blogInfosJson) {
            const dateComps = blogInfoJson.date.split("-");
            const blogInfo = makeBlogInfo(
                blogInfoJson.id,
                blogInfoJson.title,
                new Date(dateComps[0], dateComps[1], dateComps[2])
            );
            map[blogInfo.id] = blogInfo;
        }
        blogInfos = map;
    }
    return blogInfos;
}