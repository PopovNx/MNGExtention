"use strict";
import * as EPlugin from "./pluginCore"
const attr = $("html").attr("data-reader");
if(attr){
    console.log("Loading Plugin")
    EPlugin.Load();
}
