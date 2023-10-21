
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
    divs.forEach((item, index) => {
        if (index < 3) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
    console.log(divs)
}

let cafe_divs = document.querySelectorAll(".cafe_card > div");
let cafe_startItemIndext = 0;
let cafe_endItemIndext = 2;
let cafe_right_btn = document.getElementById('cafe_rightbtn');
let cafe_left_btn = document.getElementById('cafe_leftbtn');

if (cafe_divs.length < 3) {
    cafe_endItemIndext = cafe_divs.length
    cafe_right_btn.style.display = 'none'
    cafe_left_btn.style.display = 'none'
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
    cafe_divs.forEach((item, index) => {
        if (index < 3) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
    console.log(cafe_divs)
}

let review_divs = document.querySelectorAll(".review_card > div");
let review_startItemIndext = 0;
let review_endItemIndext = 2;
let review_right_btn = document.getElementById('review_rightbtn');
let review_left_btn = document.getElementById('review_leftbtn');


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
    review_divs.forEach((item, index) => {
        if (index < 3) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
    console.log(review_divs)
}

/** 즐겨찾기 지우기 */
const clickHeart = (e) => {
    console.log('menuseq', e.getAttribute('id'), e.getAttribute('value'))
    // let menuseq = e.getAttribute('value')

    if (confirm("즐겨찾기를 삭제 하시겠습니까?")) {
        let menuseq = ''
        let shopseq = ''
        let value = e.getAttribute('value')
        switch (value) {
            case 'menu':
                menuseq = e.getAttribute('id')
                shopseq = 0
                break;
            case 'shop':
                menuseq = 0
                shopseq = e.getAttribute('id')
                break;
        }

        let url = 'http://localhost:3333/setlike'
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                check: value,
                menu_seq: menuseq,
                shop_seq: shopseq
            })
        })
            .then(res => res.json())
            .then(res => {
                // console.log('result',res.result)
                alert('삭제되었습니다.')
                location.href('localhost:3333/mypage')
            })
    } else {

    }
}

/** 리뷰 지우기 */
const reviewDel = (e) => {
    if (confirm('리뷰를 삭제하시겠습니까?')) {
        let review_seq = e.getAttribute('id')
        let url = 'http://localhost:3333/reviewdel'
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                review_seq: review_seq
            })
        })
            .then(res => res.json())
            .then(res => {
                // console.log('result',res.result)
                alert('삭제되었습니다.')
            })
    }
}

menu_init();
cafe_init();
review_init();
