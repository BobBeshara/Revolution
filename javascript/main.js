var randomInterval;
random = true;
i = 0;
landigLi = document.querySelectorAll(".landing li");
landingLiMore = document.querySelectorAll(".landing .nav > li:last-child");
settingBox = document.querySelector(".settings-container");
settingBoxIcon = document.querySelector(".settings-container .icon");
settingBoxI = document.querySelector(".settings-container i");
settingBoxOption = document.querySelectorAll(".option");
randomSpans = document.querySelectorAll(".random span");
bulletSpans = document.querySelectorAll(".bul span");
resetButton = document.querySelector(".settings-container .reset");
bullets = document.querySelector(".bullets");
bulletsIcons = document.querySelector(".bullets .icons");
bullet = document.querySelectorAll(".bullet");
skills = document.querySelector(".skills");
skill = document.querySelectorAll(".skill");
galleryImg = document.querySelectorAll(".gallery img");
function activeToggle(els) {
    els.forEach((el) => {
        el.addEventListener("click" ,(ev) => {
            els.forEach((el) => {
                el.classList.remove("active");
                ev.currentTarget.classList.add("active");
            });
        });
    });
};
function getRandom() {
    if (random === true) {
        randomInterval = setInterval(() => {
            document.querySelector(".landing")
            .style.backgroundImage = 
            `url(./images/rev${(parseInt(Math.random() * 5)) + 2}.jpg)`
            }, 1000);
        };
};
function scrollToSection(els) {
    els.forEach ((el) => {
        el.addEventListener("click", ev => {
            if(ev.target.dataset.section === "more") {
                document.querySelector(".hidden").style.display = "block";
            }else {
                document.querySelector(".hidden").style.display = "none";
                document.querySelector("#"+ev.target.dataset.section).scrollIntoView({
                    behavior: "smooth"
                })
            }
        })
            el.querySelector(".after")
            ? el.querySelector(".after").innerText = el.dataset.section
            : false;
    });
}
function slider(a, b, c) {
    a.onclick = function () {
        this.parentElement.classList.toggle(b);
        this.children[0].classList.toggle(c);
    };
}
activeToggle(landigLi);
scrollToSection(landigLi);
slider(settingBoxIcon, "slide", "fa-spin");
activeToggle(settingBoxOption);
settingBoxOption.forEach(el => {
    el.addEventListener("click", (ev) => {
        window.localStorage.color = ev.currentTarget.dataset.color;
        document.documentElement.style.setProperty("--main-color", window.localStorage.color);
    });
});
if (window.localStorage.color !== undefined) {
    document.documentElement.style.setProperty("--main-color", window.localStorage.color);
    settingBoxOption.forEach(el => {
        el.classList.remove("active");
        if (el.dataset.color === localStorage.color) {
            el.classList.add("active");
        }
    })
};
activeToggle(randomSpans);
randomSpans.forEach(el => {
    el.addEventListener("click", ev => {
        if(ev.target.dataset.background === ("yes")) {
            random = true;
            getRandom()
            window.localStorage.background = true;
        } else {
            random = false;
            clearInterval(randomInterval);
            window.localStorage.background = false;
        };
    })
});
if (localStorage.background !== undefined) {
    if (localStorage.background === "true") {
        random = true;
    } else {
        random = false;
    }
    randomSpans.forEach( el => {
        el.classList.remove("active");
    });
    if (localStorage.background === "true") {
        document.querySelector(".yes").classList.add("active");
    } else if (localStorage.background === "false") {
        document.querySelector(".no").classList.add("active");
    }
};
getRandom()
activeToggle(bulletSpans);
bulletSpans.forEach((el) => {
    el.addEventListener("click", ev => {
        if (ev.target.classList.contains("yes") === true) {
            console.log("done");
            bullets.style.display = "block";
            window.localStorage.bullets = true;
        } else if (ev.target.classList.contains("no")) {
            bullets.style.display = "none";
            window.localStorage.bullets = false;
        }
    })
})
if (window.localStorage.bullets === "true") {
    bulletSpans.forEach((el) => {
    el.classList.remove("active");
    if (el.classList.contains("yes")) {
        el.classList.add("active");
    }else {
        false;
    }
    });
    bullets.style.display = "block";
} else if(window.localStorage.bullets === "false") {
    bullets.style.display = "none";
    bulletSpans.forEach((el) => {
        el.classList.remove("active");
        if (el.classList.contains("no")) {
            el.classList.add("active");
        }else {
            false;
        }
    });
}
resetButton.onclick = function () {
    window.localStorage.clear();
    window.location.reload();
}
scrollToSection(bullet);
window.onscroll = function() {
    if(window.pageYOffset > (skills.offsetTop  + skills.offsetHeight - window.innerHeight - 700 )) {
        skill.forEach((sk) => {
            sk.querySelector(".data-progress").style.width = sk.dataset.progress;
            sk.querySelector(".percentage").innerText = sk.dataset.progress;
        })
    }
};
galleryImg.forEach(img => {
    i++;
    img.src = `./images/article ${i}.jpg`
    img.dataset.number = i;
    img.addEventListener("click", evi => {
        var popupOverlay = document.createElement("div");
        popupBox = document.createElement("div");
        popupSpan = document.createElement("span");
        xLetter = document.createTextNode("x");
        popupTitle = document.createElement("h3");
        popupTitleText = document.createTextNode(img.alt);
        popupImg = document.createElement("img");
        next = document.createElement("div");
        nextIcon = document.createElement("i");
        previous = document.createElement("div");
        previousIcon = document.createElement("i");
        previousText = document.createTextNode("previous");
        document.body.appendChild(popupOverlay);
        popupOverlay.appendChild(popupBox);
        popupBox.appendChild(popupSpan);
        popupSpan.appendChild(xLetter);
        popupBox.appendChild(popupTitle);
        popupTitle.appendChild(popupTitleText);
        popupBox.appendChild(popupImg);
        popupOverlay.classList.add("popup-overlay");
        popupBox.className = "popup-box";
        popupSpan.classList.add("close-button");
        popupImg.classList.add("popup-img");
        next.classList.add("next");
        nextIcon.classList.add("fas");
        nextIcon.classList.add("fa-angle-right");
        nextIcon.classList.add("cbg");
        nextIcon.classList.add("fa-2x");
        previous.classList.add("previous");
        previousIcon.classList.add("fas");
        previousIcon.classList.add("fa-angle-left");
        previousIcon.classList.add("cbg");
        previousIcon.classList.add("fa-2x");
        popupImg.dataset.number = img.dataset.number;
        popupImg.src = img.src;
        popupBox.appendChild(next);
        next.appendChild(nextIcon);
        popupBox.appendChild(previous);
        previous.appendChild(previousIcon);
        next.addEventListener("click", _ => {
            if (popupImg.dataset.number === "10"){
                return false;
            } else {
                ++(popupImg.dataset.number); 
                popupImg.src = `./images/article ${++(evi.target.dataset.number)}.jpg`
            };
        });
        previous.addEventListener("click", _ => {
            if (popupImg.dataset.number === "1"){
                return false;
            } else {
                --(popupImg.dataset.number); 
                popupImg.src = `./images/article ${--(evi.target.dataset.number)}.jpg`
            };
        });
    })
});
document.addEventListener("click", ev => {
    if(ev.target.className === "close-button")
    document.querySelector(".popup-overlay").remove();
});
slider(bulletsIcons, "slide", "slide");