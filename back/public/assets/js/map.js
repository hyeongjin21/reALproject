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

let nowPosition = ''

// HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
if (navigator.geolocation) {


    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(function (position) {

        var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도
            
        var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
        nowPosition = new kakao.maps.LatLng(lat, lon);
        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);

    });

} else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

    var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = 'geolocation을 사용할수 없어요..'

    displayMarker(locPosition, message);
}

// 지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayMarker(locPosition, message) {

    // 마커를 생성합니다
    var user_marker = new kakao.maps.Marker({
        map: map,
        position: locPosition
    });

    var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable
    });

    // 인포윈도우를 마커위에 표시합니다 
    infowindow.open(map, user_marker);

    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);
}

const gMenu = 'http://localhost:3333/search/getMenu'

let shoploca = ''
let menuResult = ''

let menuList = {}

let category = document.getElementById('cate')

let searchname = document.getElementById('keyword')

/** 처음 메뉴리스트, 가게 위치 핑 만들기 */
fetch(gMenu)
    .then(res => res.json())
    .then(res => {
        // console.log('eksudhkTekdtlqkf')
        // console.log('디디디디디디디', res)
        menuList = res.list
        console.log('새로운 객체', menuList)
        printList(menuList);
        useShoploca(menuList);
    })

/** 메뉴 리스트 만들기 */
const printList = (menuResult, search) => {
    console.log('printList:', menuResult)
    console.log('printList-search', search)
    let ul = document.getElementById("placesList")
    if (search) {
        ul.innerHTML = ''
        search = false
    }
    for (let i = 0; i < menuResult.length; i++) {
        // console.log('메뉴결과값',menuResult[i])
        let li = document.createElement('li')
        li.innerHTML = `
                    <div class='menuList' id=menu${i}>
                        <div class='menuImg'>
                            <img src="../uploads/${menuResult[i].menu_img}"
                        </div>
                        <div class='menuInfo'>
                            <div class='shopname'>
                                ${menuResult[i].shop_name}
                            </div>
                            <div class='menuName'>
                                메뉴 이름 : ${menuResult[i].menu_name}<br> 
                            </div>
                            <div class='menuPrice'>
                                ${menuResult[i].menu_price} 원
                            </div>
                        </div>
                    </div>`
        li.addEventListener('click', function () {
            popreview(menuResult[i])
        })
        ul.appendChild(li)
    }
}

/** 검색 이벤트 */
const searchEvent = () => {
    let categoryvalue = category.options[category.selectedIndex]
    let cate = categoryvalue.value
    let name = searchname.value
    const searchmenu = `http://localhost:3333/search/getMenu?category=${cate}&&inputmenu=${name}`
    fetch(searchmenu)
        .then(res => res.json())
        .then(res => {
            console.log('searchMenu', res.list)
            menuList = res.list
            printList(menuList, true);
            useShoploca(menuList, true);
        })
}

/** 가게 위도,경도 받아와서 맵에 핑 만들기 */
const useShoploca = (shoploca, search) => {
    console.log('위도경도가져오는 함수', shoploca)
    let ul = document.getElementById("placesList")
    let positions = []
    let imgPath = '';
    for (let i = 0; i < shoploca.length; i++) {
        console.log('shopimg', shoploca[i].shop_img)
        if (shoploca[i].shop_img == null) {
            imgPath = `./img/no_img.png`
        } else {
            imgPath = `../shop_uploads/${shoploca[i].shop_img}`
        }
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
                                    <img src=${imgPath}>
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

    let marker = {};

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
        marker = new kakao.maps.Marker({
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

/** 리뷰창 띄우기 */
const popreview = (data) => {
    // console.log('리뷰띄우기')
    let getMenu = 'http://localhost:3333/search/review'
    let reviews = document.getElementById('reviews')
    let review = document.getElementById('reviewcontainer')
    // console.log('popupdata',data)
    review.style.display = 'inline-block';
    fetch(getMenu, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            menuseq: data.menu_seq,
            shopseq: data.shop_seq
        })
    })
        .then(res => res.json())
        .then(res => {
            let result = res.result
            let shopLikeCheck = res.shopLikeCheck
            let menuLikeCheck = res.menuLikeCheck
            let reviewListCheck = res.getReviewLike
            let reviewyn = res.getreviewlikeyn
            console.log('result:', result)
            // console.log('reviewyn', reviewyn)
            while (reviews.firstChild) {
                reviews.removeChild(reviews.firstChild);
            }
            //메뉴 이미지
            if (result[0].menu_img == null) {
                document.getElementById('menuImg').src = `../img/no_img.png`
            }
            else {
                document.getElementById('menuImg').src = `../uploads/${result[0].menu_img}`
            }
            document.getElementsByName('getmenuseq')[0].value = result[0].menu_seq
            document.getElementsByName('getshopseq')[0].value = result[0].shop_seq
            document.getElementById('review').value = ''
            document.getElementById('cafename').innerText = result[0].shop_name
            document.getElementById('menuname').innerText = result[0].menu_name
            console.log('reviewseqLIst', reviewListCheck)
            if (shopLikeCheck == 1) {
                document.getElementById('shoplike').style.display = 'inline'
                document.getElementById('shopunlike').style.display = 'none'
            } else {
                document.getElementById('shoplike').style.display = 'none'
                document.getElementById('shopunlike').style.display = 'inline'
            }

            if (menuLikeCheck == 1) {
                document.getElementById('menulike').style.display = 'inline'
                document.getElementById('menuunlike').style.display = 'none'
            } else {
                document.getElementById('menulike').style.display = 'none'
                document.getElementById('menuunlike').style.display = 'inline'
            }

            if (result[0].menu_desc == null) {
                document.getElementById('menudesc').innerText = '설명없음'
            } else {
                document.getElementById('menudesc').innerText = result[0].menu_desc
            }
            let cnt = 0
            for (let i = 0; i < result.length; i++) {
                let div = document.createElement('div')
                div.innerHTML = `
                <div class="reviewitem">
                    <div>
                        <div class='reviewcontain'>
                            <div class='reviewbetween'>
                                <div class='reviewname'>${result[i].user_id}</div>
                                <div id="reviewlikearea" onclick="reviewlikeclick('${result[i].user_id}','${cnt}','${result[i].review_seq}')">
                                    <img src='./assets/img/굿1.png' class="${result[i].user_id} ${cnt} like" id="reviewlike">
                                    <img src='./assets/img/굿2.png' class="${result[i].user_id} ${cnt} unlike" id="reviewunlike">
                                </div>
                            </div>
                            <div class='reviewcontent'>"${result[i].review_content}"</div>
                        </div>
                    </div>
                </div>
                `
                // console.log('reviewListCheck',reviewListCheck)
                // console.log('리뷰시퀀스',result[i].review_seq)
                // console.log('인덱스오브',reviewListCheck.indexOf(result[i].review_seq))
                reviews.appendChild(div)
                // console.log('123123123', reviewListCheck.indexOf(result[i].review_seq))
                if (reviewListCheck.indexOf(result[i].review_seq) == -1 || reviewyn[reviewListCheck.indexOf(result[i].review_seq)] == 'N') {
                    document.getElementsByClassName(`${result[i].user_id} ${cnt} like`)[0].style.display = 'none'
                    document.getElementsByClassName(`${result[i].user_id} ${cnt} unlike`)[0].style.display = 'block'
                } else if (reviewyn[reviewListCheck.indexOf(result[i].review_seq)] == 'Y') {
                    document.getElementsByClassName(`${result[i].user_id} ${cnt} like`)[0].style.display = 'block'
                    document.getElementsByClassName(`${result[i].user_id} ${cnt} unlike`)[0].style.display = 'none'
                }
                cnt++
            }
        }
        )

}

/** 리뷰 좋아요 눌렀을때 */
const reviewlikeclick = (id, cnt, seq) => {
    // console.log('id,cnt',id,cnt)
    let like = document.getElementsByClassName(`${id} ${cnt} like`)[0]
    let unlike = document.getElementsByClassName(`${id} ${cnt} unlike`)[0]
    let likecheck = 0

    if (like.style.display == 'none') {
        like.style.display = 'block'
        unlike.style.display = 'none'
        likecheck = 1
    } else {
        like.style.display = 'none'
        unlike.style.display = 'block'
        likecheck = 0
    }
    // const menuLikeChange = `http://localhost:3333/search/menulike?menu_seq=${ menuSeq.value }&&likeCheck=${ mlike }`
    // fetch(menuLikeChange,{
    // })
    //     .then(res => res.json())
    //     .then(res => {

    //     })
    const reviewlikechange = `http://localhost:3333/search/reviewlike?reviewseq=${seq}&&reviewLike=${likecheck}`
    fetch(reviewlikechange, {
    })
        .then(res => res.json())
        .then(res => {
        })
}

/** 정렬 버튼 눌렀을 때 반응 */
const orderList = (id, value) => {
    // <button id="price_order" value='desc'>가격순</button>
    // <button id="distance_order" value='desc'>거리순</button>
    // <button id="pop_order" value='desc'>인기순</button>

    switch (id) {
        case 'price_order':
            let orderList = menuList.sort((a, b) => value == 'desc' ? (a.menu_price - b.menu_price) : (b.menu_price - a.menu_price))

            document.getElementById('price_order').value == 'desc' ? document.getElementById('price_order').value = 'asc' : document.getElementById('price_order').value = 'desc'

            printList(orderList, true)
            break;

        case 'distance_order':
            let distanceOrder = menuList.sort((a, b) => value == 'desc' ? (positionDistance(a.lat, a.lng, nowPosition.Ma, nowPosition.La)) - (positionDistance(b.lat, b.lng, nowPosition.Ma, nowPosition.La)) : (positionDistance(b.lat, b.lng, nowPosition.Ma, nowPosition.La)) - (positionDistance(a.lat, a.lng, nowPosition.Ma, nowPosition.La)))

            document.getElementById('distance_order').value == 'desc' ? document.getElementById('distance_order').value = 'asc' : document.getElementById('distance_order').value = 'desc'

            printList(distanceOrder,true)
            break;

        case 'pop_order':

            document.getElementById('pop_order').value == 'desc' ? document.getElementById('pop_order').value = 'asc' : document.getElementById('pop_order').value = 'desc'
            
            break;
    }
}

/** 좌표간 거리 구하기 */
const positionDistance = (aLat, aLng, bLat, bLng) => {
    let lat = aLat - bLat
    let lng = aLng - bLng
    let dist = Math.sqrt(Math.abs(lat * lat) + Math.abs(lng * lng))
    return dist
}