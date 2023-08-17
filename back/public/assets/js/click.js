

let inputId = document.getElementById('id')
let join = document.getElementById('join')
let checking = document.getElementsByClassName('checking')

const checkId = () => {
    console.log(inputId.value)
    let id = inputId.value;
    let url = 'http://localhost:3333/user/checkId';
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            input: id
        })
    })
        .then(res => res.json())
        .then(res => {
            document.getElementsByClassName('checking').value = res.check
            if (res.ok == 1) {
                alert('중복되었습니다.')
            }
            else if (res.ok == 2) {
                alert('사용가능합니다.')
            }
            else {
                alert('아이디 중복 확인')
            }
        })
}

const popId=()=>{
    let id = document.getElementById('id').value
    alert(`${id}님 환영합니다!`)
    location.href='http://localhost:3333/login'
}

//카카오로그인
function kakaoLogin() {
    console.log('카카오')
    Kakao.Auth.login({
        success: function (response) {
            Kakao.API.request({
                url: '/v2/user/me',
                success: function (response) {
                    let user_name = response.kakao_account.profile.nickname;
                    location.href = `http://localhost:3333?user_name=${user_name}`
                },
                fail: function (error) {
                    console.log(error)
                },
            })

        },
        fail: function (error) {
            console.log(error)
        },
    })
}

const popId=()=>{
    let id = document.getElementById('id').value
    alert(`안녕하세요~${id}`)
    location.href='http://localhost:3333/login'
}

//카카오로그아웃  
function kakaoLogout() {
    if (Kakao.Auth.getAccessToken()) {
        Kakao.API.request({
            url: '/v1/user/unlink',
            success: function (response) {
                console.log(response)
            },
            fail: function (error) {
                console.log(error)
            },
        })
        Kakao.Auth.setAccessToken(undefined)
}}


//상점 좋아요 눌렀을때 반응
const shopLike = () => {
    // let likearea = document.getElementById('menulikearea')
    let like = document.getElementById('shoplike')
    let unlike = document.getElementById('shopunlike')
    let getShopSeq = document.getElementsByName('getshopseq')[0]
    // like.style.display = 'none'
    let likeCheck = 0
    console.log('shopseq:',getShopSeq.value)
    if (like.style.display == 'none') {
        like.style.display = 'inline'
        unlike.style.display = 'none'
        likeCheck = 1
    } else {
        like.style.display = 'none'
        unlike.style.display = 'inline'
        likeCheck = 0
    }
    let shop_seq =  getShopSeq.value
    // console.log(shop_seq)
    //user_id, shop_seq get쿼리로보내기
    const shopLikeChange = `http://localhost:3333/search/shoplike?shop_seq=${ shop_seq }&&likeCheck=${likeCheck}`
    fetch(shopLikeChange,{
    })
        .then(res => res.json())
        .then(res => {

        })
}

const input = 'http://localhost:3333/search/inputreview'
//리뷰 등록 이벤트
//menu_seq,review_contant,user_id
const addreview = () => {
    // console.log('test')
    let seq = document.getElementsByName('getmenuseq')[0].value
    let review = document.getElementById('review').value
    fetch(input, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            menuseq: seq,
            review: review
        })
    })
        .then(res => res.json())
        .then(res => {
            // console.log('login:', res)
            popreview(res)
        })

}

// 메뉴 좋아요 누르기
const menuLike=()=>{
    let menuLike = document.getElementById('menulike')
    let menuUnLike = document.getElementById('menuunlike')
    let menuSeq = document.getElementsByName('getmenuseq')[0]
    let mlike = 0

    if(menuLike.style.display == 'none'){
        menuLike.style.display = 'inline'
        menuUnLike.style.display = 'none'
        mlike = 1
    }else{
        menuLike.style.display = 'none'
        menuUnLike.style.display = 'inline'
        mlike = 0
    }
    console.log('menuseq',menuSeq.value)
    console.log('mlike',mlike)
    const menuLikeChange = `http://localhost:3333/search/menulike?menu_seq=${ menuSeq.value }&&likeCheck=${ mlike }`
    fetch(menuLikeChange,{
    })
        .then(res => res.json())
        .then(res => {

        })

}


document.querySelector("#likearea a").addEventListener("click", function(event) {
    event.preventDefault();  // a 태그의 기본 동작을 중지합니다.
    const shopWrap = document.querySelector("#reviewcontainer");
    if (shopWrap.style.display === "block") {
        shopWrap.style.display = "none";
    } else {
        shopWrap.style.display = "block";
    }
});
