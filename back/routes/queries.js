module.exports = {
    // 일반 회원가입 할때 
    joinUser: `insert into al_user values( ?,?,?,?,?,now() )`,

    selectID: `select * from al_user where user_id = ?`,
    // 아이디 검색
    searchId: `select * from al_user where user_id = ? and user_pw = ?`,

    //메뉴검색 & 카테고리(전체 선택)
    searchMenu: `select * from al_shop a inner join al_menu b on ( a.shop_seq = b.shop_seq ) where b.menu_name like ?`,

    //메뉴검색 - 카테고리별 선택
    searchMenuCategory: `select * from al_shop a inner join al_menu b on ( a.shop_seq = b.shop_seq ) where b.menu_name like ? and b.menu_category = ?`,

    //검색 - 메뉴선택 - 지도 위도 경도가져오기
    shopLocation : `select a.lat, a.lng from al_shop a inner join al_menu b on ( a.shop_seq = b.shop_seq ) where b.shop_seq = ?`
}


