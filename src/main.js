"use strict";
import * as EPlugin from "./pluginCore"
import $ from "jquery"
import {MangaLib} from "./Interactor";

const attr = $("html").attr("data-reader");
if (attr) {
    console.log("Loading Plugin")
    EPlugin.Load();
}
