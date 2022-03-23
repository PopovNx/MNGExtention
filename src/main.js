"use strict";
import * as EPlugin from "./pluginCore"
import $ from "jquery"
import {MangaLib} from "./Interactor";

const attr = $("html").attr("data-reader");
if (attr) {
    console.log("Loading Plugin")
    EPlugin.Load();
}
let testPageCumCockManager = 1;
document.onkeydown = (key) => {
    if (key.key === "2"){
        testPageCumCockManager++;
    }
    if (key.key === "1"){
        testPageCumCockManager--;
    }
    console.log(testPageCumCockManager)
    if (key.key === "5"){
        MangaLib.GoToPage(testPageCumCockManager);
    }
     
}