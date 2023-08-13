
// console.log('testtest')
// let coltags = document.querySelectorAll('col-md-4')
// let index = 0
// coltags.forEach(element => {
//     element.style.display = 'none'
// })        


let divs = document.querySelectorAll(".menu_card > div");
let startItemIndext = 0;
let endItemIndext = 2;
let right_btn = document.getElementById('rightbtn');
let left_btn = document.getElementById('leftbtn');

menu_init();

if (divs.length < 3) {
    endItemIndext = divs.length
    right_btn.style.display = 'none'
    left_btn.style.display = 'none'
}
right_btn.onclick = function () {
    if (endItemIndext == divs.length - 1) {

    } else {
        divs[endItemIndext - 2].style.display = "none";
        endItemIndext++;
        startItemIndext++;
        divs[endItemIndext].style.display = "block";
    }
}

left_btn.onclick = function () {
    if (startItemIndext == 0) {

    } else {
        divs[startItemIndext + 2].style.display = "none";
        endItemIndext--;
        startItemIndext--;
        divs[startItemIndext].style.display = "block";
    }
}

function menu_init() {
    divs.forEach((item) => {
        item.style.display = "none";
    });
    for (i = 0; i < 3; i++) {
        divs[i].style.display = "block";
    }
    console.log(divs)
}

let cafe_divs = document.querySelectorAll(".cafe_card > div");
let cafe_startItemIndext = 0;
let cafe_endItemIndext = 2;
let cafe_right_btn = document.getElementById('cafe_rightbtn');
let cafe_left_btn = document.getElementById('cafe_leftbtn');

cafe_init();

if (cafe_divs.length < 3) {
    cafe_endItemIndext = cafe_divs.length
    cafe_rightbtn.style.display = 'none'
    cafe_leftbtn.style.display = 'none'
}
cafe_rightbtn.onclick = function () {
    if (cafe_endItemIndext == cafe_divs.length - 1) {

    } else {
        cafe_divs[cafe_endItemIndext - 2].style.display = "none";
        cafe_endItemIndext++;
        cafe_startItemIndext++;
        cafe_divs[cafe_endItemIndext].style.display = "block";
    }
}

cafe_left_btn.onclick = function () {
    if (cafe_startItemIndext == 0) {

    } else {
        cafe_divs[cafe_startItemIndext + 2].style.display = "none";
        cafe_endItemIndext--;
        cafe_startItemIndext--;
        cafe_divs[cafe_startItemIndext].style.display = "block";
    }
}

function cafe_init() {
    cafe_divs.forEach((item) => {
        item.style.display = "none";
    });
    for (i = 0; i < 3; i++) {
        cafe_divs[i].style.display = "block";
    }
    console.log(cafe_divs)
}

let review_divs = document.querySelectorAll(".review_card > div");
let review_startItemIndext = 0;
let review_endItemIndext = 2;
let review_right_btn = document.getElementById('review_rightbtn');
let review_left_btn = document.getElementById('review_leftbtn');

review_init();

if (review_divs.length < 3) {
    review_endItemIndext = review_divs.length
    review_right_btn.style.display = 'none'
    review_left_btn.style.display = 'none'
}
review_right_btn.onclick = function () {
    if (review_endItemIndext == review_divs.length - 1) {

    } else {
        review_divs[review_endItemIndext - 2].style.display = "none";
        review_endItemIndext++;
        review_startItemIndext++;
        review_divs[review_endItemIndext].style.display = "block";
    }
}

review_left_btn.onclick = function () {
    if (review_startItemIndext == 0) {

    } else {
        review_divs[review_startItemIndext + 2].style.display = "none";
        review_endItemIndext--;
        review_startItemIndext--;
        review_divs[review_startItemIndext].style.display = "block";
    }
}

function review_init() {
    review_divs.forEach((item) => {
        item.style.display = "none";
    });
    for (i = 0; i < 3; i++) {
        review_divs[i].style.display = "block";
    }
    console.log(review_divs)
}
