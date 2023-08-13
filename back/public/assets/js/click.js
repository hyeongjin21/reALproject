

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
    }
}

//좋아요 표시
let islike = false;
let likearea = document.getElementById('likearea')
let unlike = document.getElementById('unlike')
let like = document.getElementById('like')
like.style.display = 'none'
likearea.addEventListener('click', () => {
    if (islike) {
        like.style.display = 'inline'
        unlike.style.display = 'none'
        islike = false;
    } else {
        like.style.display = 'none'
        unlike.style.display = 'inline'
        islike = true;
    }
})

//리뷰 등록 이벤트
//menu_seq,review_contant,user_id
const addreview = () =>{
    console.log('클릭',sessionStorage)
    let check = 0
    if(check == 1){

    }
}


// const addreview = () =>{
//     let check = confirm('등록하시겠습니까?')
//     if(check){
//         alert('등록 함')
//     }else{
//         alert('등록 안함')
//     }
// }