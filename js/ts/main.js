var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as PIXI from 'pixi.js-legacy';
import 'pixi.js-legacy';
import { Slider } from "./classes/slider";
import { Universe } from "./classes/universe";
import { ScaleText } from "./classes/scaleText";
import { map } from "./helpers/map";
import { Tweenable } from "shifty";
import { Howl, Howler } from "howler";
import isMobile from 'ismobilejs';
let hasPickedLang = false;
let allHighTextures;
const titles = [
    'The Scale of the Universe 2',
    'סדרי גודל ביקום',
    'De schaal van het Universum',
    'The Scale of the Universe 2',
    '宇宙的刻度',
    'La Escala del Universo 2',
    'Universums Skala',
    'Rozmiar Wszechświata',
    'A Escala do Universo',
    'Die Proportionen des Universums',
    '宇宙的刻度',
    "L'échelle de l'Univers",
    'La Skalo de la Universo',
    'Scala Universului',
    'Розмір Всесвіту',
    'ﻥﻮﻜﻟﺍ ﺱﺎﻴﻘﻣ',
    '우주의 규모',
    'Universumi ulatus',
    'ابعاد جهان 2',
    'Evren Ölçeði 2'
];
const titleEl = document.getElementById("title");
const hoverTitleEl = document.getElementById("hoverTitle");
let hoverTimeout;
window['setTitle'] = (idx) => {
    if (hoverTimeout)
        clearTimeout(hoverTimeout);
    hoverTitleEl.innerHTML = titles[idx];
    hoverTitleEl.style.display = 'block';
    titleEl.style.display = 'none';
};
window['revealTitle'] = () => {
    if (hoverTimeout)
        clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(showTitle, 1000);
};
function showTitle() {
    titleEl.style.display = 'block';
    hoverTitleEl.style.display = 'none';
}
const dialogPolyfill = require("dialog-polyfill");
// PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
// PIXI.settings.RESOLUTION = 2;
const staticHostingURL = "https://d1w6pmjy03071n.cloudfront.net";
const frozenStar = new Howl({
    src: [
        `${staticHostingURL}/frozen_star.webm`,
        `${staticHostingURL}/frozen_star.mp3`
    ],
    loop: true,
    volume: 0.5
});
let isHQ = true;
let hasHQ = false;
const fadeInApp = new Tweenable();
fadeInApp.setConfig({
    from: { opacity: 0 },
    to: { opacity: 1 },
    easing: "easeOutSine",
    duration: 2500,
    step: state => (frame.style.opacity = state.opacity)
});
console.log(`
  Scale of the Universe 2.1

  Created by Cary Huang
  Implemented by Matthew Martori @matttt on github
  
  Made with ♥️
`);
if (isMobile(window.navigator).phone) {
    alert('This version of Scale of the Universe 2 is not designed for phones. Please find the app on the iOS app store.');
    document.write('Download the Scale of the Universe iOS app!');
    document.getElementById('modal').style.opacity = '0';
}
;
const modal = document.getElementById("modal");
// modal.showModal();
let n = 0;
const fadeOut = new Tweenable();
fadeOut.setConfig({
    from: { opacity: 1 },
    to: { opacity: 0 },
    easing: "easeInOutSine",
    duration: 500,
    step: state => (titleEl.style.opacity = state.opacity)
});
const fadeIn = new Tweenable();
fadeIn.setConfig({
    from: { opacity: 0 },
    to: { opacity: 1 },
    easing: "easeInOutSine",
    duration: 500,
    step: state => (titleEl.style.opacity = state.opacity)
});
let titleCaroselTimeout;
function titleCarosel() {
    titleEl.textContent = titles[n++ % (titles.length - 1)];
    fadeIn.tween().then(titleCaroselTimeout = setTimeout(() => {
        fadeOut.tween().then();
    }, 2000));
}
const muteToggle = document.querySelector('.speaker');
let isMuted = false;
muteToggle.onclick = function (ev) {
    ev.preventDefault();
    isMuted = !isMuted;
    muteToggle.classList.toggle('mute');
    Howler.mute(isMuted);
};
titleCarosel();
const titleCaroselInterval = setInterval(titleCarosel, 3000);
const frame = document.getElementById("frame");
const sotuFrame = document.getElementById("sotu");
const langWrapper = document.getElementById("langWrapper");
const startWrapper = document.getElementById("startWrapper");
const loader = new PIXI.Loader();
loader.add("assetsLow", `${staticHostingURL}/quarter_items-0-main.json`);
// loader.add('assets1', '/img/new/item_textures_0_quarter.json')
dialogPolyfill.registerDialog(modal);
const globalResolution = 1;
const loadingSpin = document.getElementById("loadingSpin");
loader.load((loader, resources) => __awaiter(void 0, void 0, void 0, function* () {
    // document.getElementById('loadingBar').style.visibility = 'hidden';
    loadingSpin.visibility = 'hidden';
    loadingSpin.remove();
    langWrapper.style.visibility = 'visible';
    let app;
    try {
        app = new PIXI.Application({
            width: frame.offsetWidth,
            height: frame.offsetHeight,
            // backgroundColor: 0xffffff,
            antialias: true,
            transparent: true,
            // autoDensity: true,
            powerPreference: "high-performance",
            resolution: globalResolution,
            forceFXAA: true,
            sharedTicker: true,
            resizeTo: sotuFrame
        });
        // app.view.style.zindex = '200'
    }
    catch (err) {
        console.log(err);
        app = new PIXI.Application({
            width: frame.offsetWidth,
            height: frame.offsetHeight,
            backgroundColor: 0xffffff,
            antialias: true,
            // autoDensity: true,
            forceCanvas: true,
            transparent: true,
            resolution: globalResolution
        });
    }
    const w = app.renderer.width;
    const h = app.renderer.height;
    let slider = new Slider(app, w, h, globalResolution, onChange, onHandleClicked);
    slider.init();
    let universe = new Universe(0, slider, app);
    let scaleText = new ScaleText((w * 0.9) / globalResolution, (slider.topY - 40), "0");
    const highLoader = new PIXI.Loader();
    const highJSONCount = 5;
    for (let i = 0; i <= highJSONCount; i++) {
        highLoader.add(`main${i}`, `${staticHostingURL}/new_items_${i}.json`);
    }
    highLoader.load((highLoader, highResources) => __awaiter(void 0, void 0, void 0, function* () {
        const hqToggle = document.querySelector('#hqToggle');
        isHQ = true;
        hasHQ = true;
        allHighTextures = {};
        for (let key of Object.keys(highResources)) {
            if (!key.includes('_image'))
                allHighTextures = Object.assign(Object.assign({}, allHighTextures), highResources[key].textures);
        }
        hqToggle.classList.add('hd-click');
        if (hasPickedLang) {
            universe.hydrateHighTextures(allHighTextures);
        }
    }));
    let buttons = document.getElementById('buttons');
    const spaceBg = document.getElementById('spaceBgImage');
    const earthBg = document.getElementById('earthBgImage');
    function onChange(x, percent) {
        let scaleExp = percent * 62 - 35; //range of 10^-35 to 10^27
        scaleText.setColor(scaleExp);
        if (scaleExp > 5 && scaleExp < 7) {
            let opacity = map(scaleExp, 5, 7, 0.1, 100);
            let opacityNorm = opacity / 100;
            buttons.style.filter = `invert(${opacity}%)`;
            spaceBg.style.opacity = `${opacityNorm}`;
            // earthBg.style.opacity = `${1 - opacityNorm}`;
        }
        else {
            if (buttons.style.filter)
                delete buttons.style.filter;
        }
        universe.update(scaleExp);
        scaleText.setText(`${Math.round(scaleExp * 10) / 10}`);
    }
    function onHandleClicked() {
        universe.onHandleClicked();
    }
    window["setLang"] = (btnClass, langIdx) => __awaiter(void 0, void 0, void 0, function* () {
        const textData = (yield (yield fetch(`data/languages/l${langIdx}.txt`)).text()).split("\n");
        const hqToggle = document.querySelector('#hqToggle');
        hqToggle.onclick = function (ev) {
            ev.preventDefault();
            isHQ = !isHQ;
            if (!isHQ) {
                highLoader.reset();
                universe.clearHighQualityTextures();
                hqToggle.classList.remove('hd-click');
            }
            else {
                hqToggle.classList.add('hd-click');
                for (let i = 0; i <= 5; i++) {
                    highLoader.add(`main${i}`, `${staticHostingURL}/new_items_${i}.json`);
                }
            }
            universe.setQuality(isHQ);
        };
        const btns = document.querySelectorAll('button.box');
        for (const button of btns) {
            if (button.classList[1] !== btnClass) {
                button.style.visibility = 'hidden';
            }
        }
        startWrapper.style.display = 'block';
        // start us at scale 0
        slider.setPercent(map(0.1, -35, 27, 0, 1));
        app.stage.addChild(universe.container, slider.container, scaleText.container, universe.displayContainer);
        sotuFrame.appendChild(app.view);
        langWrapper.style.visibility = "hidden";
        langWrapper.remove();
        clearInterval(titleCaroselInterval);
        clearTimeout(titleCaroselTimeout);
        fadeIn.stop(true);
        fadeOut.stop(true);
        titleEl.innerHTML = textData[619];
        titleEl.style.opacity = '1';
        const startButtonText = textData[622].replace(/\r?\n|\r/g, '');
        const translationCreditText = textData[623];
        const startButton = document.querySelector('#startBtn');
        const translationCredit = document.querySelector('#translationCredit');
        startButton.innerHTML = startButtonText;
        translationCredit.innerHTML = translationCreditText;
        // document.getElementById('startBtn').innerHTML = textData[619]
        document.getElementById('moveSliderText').innerHTML = textData[620];
        document.getElementById('clickObjectText').innerHTML = textData[621];
        // document.getElementById('startTitle').innerHtml = textData[619]
        yield universe.createItems(resources, textData);
        slider.setPercent(map(0, -35, 27, 0, 1));
        universe.prevZoom = 0;
        hasPickedLang = true;
        if (hasHQ) {
            universe.hydrateHighTextures(allHighTextures);
        }
        window["startSOTU"] = () => {
            modal.close();
            frame.style.visibility = "visible";
            fadeInApp.tween().then();
            frozenStar.play();
        };
    });
}));
// let loadingBar = new ldBar("#loadingBar");
// loader.onLoad.add(() => {
//   loadingBar.set(loader.progress)
// });
