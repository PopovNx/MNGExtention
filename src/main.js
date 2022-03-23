"use strict";
import * as EPlugin from "./pluginCore"
import $ from "jquery"
import {MangaLib} from "./Interactor";

const attr = $("html").attr("data-reader");
if (attr) {
    console.log("Loading Plugin")
    EPlugin.Load();
}
document.onkeydown = (key) => {
    if (key.key === "6")
        MangaLib.NextPage();
    if (key.key === "4")
        MangaLib.PrevPage();
    if (key.key === "7")
        MangaLib.BlockMouse();
    if (key.key === "3")
        MangaLib.UnlockMouse();
}