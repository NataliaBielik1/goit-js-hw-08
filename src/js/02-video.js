import Player from "@vimeo/player";
var throttle = require("lodash.throttle");

const iframe = document.querySelector("iframe");
const player = new Player(iframe);

const key = "videoplayer-current-time";
const savedTime = localStorage.getItem(key) ? localStorage.getItem(key) : 0;
const saveTime = seconds => localStorage.setItem(key, seconds);
const timeUpdateHandler = e => saveTime(e.seconds);

player.setCurrentTime(savedTime);

player.on("timeupdate", throttle(timeUpdateHandler, 1000));
