

// 광인사 좌표 35.146587, 126.922354
var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
    mapOption = {
        center: new kakao.maps.LatLng(35.146587, 126.922354), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

// 마커를 담을 배열입니다
var markers = [];

// 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();

const url = 'http://localhost:3333/search/get-coordinate'
const gMenu = 'http://localhost:3333/search/getMenu'

let shoploca = ''
let menuResult = ''

let category = document.getElementById('cate')

let searchname = document.getElementById('keyword')

// 지도에 가게 핑 찍기용 fetch
fetch(url)
    .then(res => res.json())
    .then(res => {
        shoploca = res.result
        // console.log('test')
        // 목록에 메뉴 출력용 fetch
        fetch(gMenu)
            .then(res => res.json())
            .then(res => {
                // console.log('패치값:',res.list)
                menuResult = res.list
                let ul = document.getElementById("placesList")
                for (let i = 0; i < menuResult.length; i++) {
                    // console.log('메뉴결과값',menuResult[i])
                    let li = document.createElement('li')
                    li.innerText = `메뉴 이름 : ${menuResult[i].menu_name} 
                    가격 : ${menuResult[i].menu_price}`
                    li.addEventListener('click', function () {
                        popreview(menuResult[i])
                    })
                    ul.appendChild(li)
                }

                // searchEvent()

            })
        useShoploca();
    })

const searchEvent = () => {
    fetch(url)
        .then(res => res.json())
        .then(res => {
            shoploca = res.result
            // console.log('test')
            // 목록에 메뉴 출력용 fetch
            fetch(gMenu)
                .then(res => res.json())
                .then(res => {
                    let categoryvalue = category.options[category.selectedIndex]
                    menuResult = res.list
                    let cate = categoryvalue.value
                    let name = searchname.value
                    // console.log('클릭실행함',cate,name)
                    let ul = document.getElementById("placesList")
                    ul.innerHTML = ''
                    for (let i = 0; i < menuResult.length; i++) {
                        console.log('메뉴결과값',menuResult[i].menu_name)
                        // console.log("T,F",menuResult[i].menu_name.indexOf(name))
                        if (menuResult[i].menu_name.indexOf(name) >= 0 &&
                            menuResult[i].menu_category == cate) {
                            let li = document.createElement('li')
                            li.innerText = `메뉴 이름 : ${menuResult[i].menu_name} 
                            가격 : ${menuResult[i].menu_price}`
                            li.addEventListener('click', function () {
                                popreview(menuResult[i])
                            })
                            ul.appendChild(li)
                        }
                    }
                })
            useShoploca();
        })
}

// 가게 위도경도 받아오기
const useShoploca = () => {
    let ul = document.getElementById("placesList")
    let positions = []
    for (let i = 0; i < shoploca.length; i++) {
        if (shoploca.lat != 0) {
            if (shoploca[i].shop_addr2 == null) {
                shoploca[i].shop_addr2 = ''
            }
            positions[i] = [
                {
                    title: shoploca[i].shop_name,
                    content:
                        `<div class = "wrap">
                        <div class="info">
                            <div class="title">
                                ${shoploca[i].shop_name}
                            </div>
                            <div class='body'>
                                <div class="img">
                                    <img src="../shop_uploads/${shoploca[i].shop_img}">
                                </div>
                                <div class="desc">
                                    <div class="ellipsis">
                                        ${shoploca[i].shop_addr1}
                                    </div>
                                    <div class="jibun ellipsis">
                                        ${shoploca[i].shop_addr2}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`,
                    latlng: new kakao.maps.LatLng(shoploca[i].lat, shoploca[i].lng)
                }
            ]
        }
    }

    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    for (var i = 0; i < positions.length; i++) {

        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(24, 35);

        // 마커 이미지를 생성합니다    
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커에 표시할 인포윈도우를 생성합니다 
        var infowindow = new kakao.maps.InfoWindow({
            content: positions[i][0].content // 인포윈도우에 표시할 내용
        });

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[i][0].latlng, // 마커를 표시할 위치
            title: positions[i][0].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage // 마커 이미지 
        });

        // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
        // 이벤트 리스너로는 클로저를 만들어 등록합니다 
        // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
        kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
        // console.log('marker:', marker)
    }
    // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
    function makeOverListener(map, marker, infowindow) {
        return function () {
            infowindow.open(map, marker);
        };
    }

    // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
    function makeOutListener(infowindow) {
        return function () {
            infowindow.close();
        };
    }
}

//리뷰창 띄우기
const popreview =  (data) => {
    // console.log('리뷰띄우기')
    let getMenu = 'http://localhost:3333/search/review'
    let reviews = document.getElementById('reviews')
    let review = document.getElementById('reviewcontainer')
    review.style.display = 'inline-block';
    fetch(getMenu, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            menuseq: data.menu_seq
        })
    })
        .then(res => res.json())
        .then(res => {
            result = res.result
            console.log('result:', result)
            while (reviews.firstChild) {
                reviews.removeChild(reviews.firstChild);
            }
            // console.log('result:',result[0])
            document.getElementsByName('getmenuseq')[0].value = result[0].menu_seq
            document.getElementById('review').value = ''
            document.getElementById('cafename').innerText = result[0].shop_name
            document.getElementById('menuname').innerText = result[0].menu_name
            if (result[0].menu_desc == null) {
                document.getElementById('menudesc').innerText = '설명없음'
            } else {
                document.getElementById('menudesc').innerText = result[0].menu_desc
            }
            for (let i = 0; i < result.length; i++) {
                let div = document.createElement('div')
                div.innerHTML = `<div class="reviewitem">${result[i].user_id} : ${result[i].review_content}</div>`
                reviews.appendChild(div)
            }
        })
        
    }
