const url = 'http://localhost:3333/search/get-coordinate'

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

let shoploca = ''
fetch(url)
    .then(res => res.json())
    .then(res => {
        shoploca = res.result
        useShoploca();
    })
const useShoploca = () => {
    let positions = []
    for (let i = 0; i < shoploca.length; i++) {
        if (shoploca.lat != 0) {
            positions[i] = [
                {
                    title: shoploca[i].shop_name,
                    content: `<div>${shoploca[i].shop_name}</div>`,
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
const sMenu = 'http://localhost:3333/search/getMenu'

let menuResult = ''
fetch(sMenu)
    .then(res => res.json())
    .then(res => {
        menuResult = res.menu
        printMenu();
    })

const printMenu = () => {
    console.log('실행됨?')
}

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

// 키워드로 장소를 검색합니다
searchPlaces();

// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {

    var keyword = document.getElementById('keyword').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch(keyword, placesSearchCB);
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);

        // 페이지 번호를 표출합니다
        displayPagination(pagination);

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}
//console.log('shoploca:',shoploca.result)


// 주소-좌표 변환 객체를 생성합니다
// var geocoder = new kakao.maps.services.Geocoder();

// // 주소로 좌표를 검색합니다
// geocoder.addressSearch('제봉로82번길 13', function (result, status) {

//     // 정상적으로 검색이 완료됐으면
//     if (status === kakao.maps.services.Status.OK) {

//         var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

//         // console.log('coord:',coords)
//         // console.log('경도',coords.La)
//         // console.log('위도',coords.Ma)
//     }
// });

// 주소로 좌표를 검색합니다
// geocoder.addressSearch('제봉로82번길 13', function(result, status) {

//     // 정상적으로 검색이 완료됐으면
//      if (status === kakao.maps.services.Status.OK) {

//         var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

//         console.log('coord:',coords)
//         console.log('경도',coords.La)
//         console.log('위도',coords.Ma)
//         // 결과값으로 받은 위치를 마커로 표시합니다
//         var marker = new kakao.maps.Marker({
//             map: map,
//             position: coords
//         });

//         // 인포윈도우로 장소에 대한 설명을 표시합니다
//         var infowindow = new kakao.maps.InfoWindow({
//             content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
//         });
//         infowindow.open(map, marker);

//         // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
//         map.setCenter(coords);
//     }
// });    