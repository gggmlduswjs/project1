// 장바구니 배열
const products = [ 
    {
        img: "./assets/products/product1.jpg",
        title: "레이디 랭 RC",
        color: "블랙 / 브라운",
        price: 289000,       
        qty: 1
    },
    {
        img: "./assets/products/product19.jpg",
        title: "던스 01",
        color: "블랙",
        price: 340000,
        qty: 1
    },
    {
        img: "./assets/products/product3.jpg",
        title: "캐럿 02",
        color: "화이트",
        price: 360000,
        qty: 1
    }
];

//위시리스트 배열
const wishlist = [];

// 장바구니 렌더링
function renderCart() {
    const list = document.getElementById("cart-list");
    list.innerHTML = "";

    //장바구니 비어있을 때
    if (products.length === 0) {
        list.innerHTML = `<p style='text-align:center; padding:50px 0; font-size:18px; margin-top:130px;'>쇼핑백에 추가된 제품이 없습니다.</p>
                        <div class="wish-btn"><a href="./index.html"><button>쇼핑 계속하기</button></a></div>`;
        updateCartCount();
        totalPrice();
        return;
    }
    //장바구니 리스트 생성
    const ul = document.createElement("ul");
    ul.classList.add("cart-list-ul");

    products.forEach(function (item, index) {
        const li = document.createElement("li");
        li.innerHTML = `
                <div class = "list-item">
                    <div><input type="checkbox" class = "cb" data-index = "${index}"></div>
                    <div><img class = "list-item-img" src="${item.img}" alt="${item.title}"></div>
                    <div>
                        <p>${item.title}</p>
                        <p class = "item-color">${item.color}</p>
                        <p class = "amt">₩ ${item.price.toLocaleString()}</p>
                    </div>
                    <div class = "count-delete">
                        수량 <select class="count-select" onchange="calPrice(this, ${index})">
                                    ${[...Array(5)].map((_, i) => `
                                        <option value="${i + 1}" ${item.qty === i + 1 ? 'selected' : ''}>${i + 1}</option>
                                    `).join("")}
                            </select>
                        <div class = "item-delete-wrap"><button onclick= "itemDelete(${index})" class="item-delete">삭제하기</button></div>
                    </div>
                    <div><img src = "./assets/icons/즐겨찾기1.png" art = "북마크" class="bookmark-icon" data-index="${index}" style = "width:25px; height:25px; cursor:pointer;"></div>
                </div>`;
        ul.appendChild(li);
    });
    list.appendChild(ul);

    updateCartCount();
    updateWishCount();
    totalPrice();

    //체크박스 이벤트
    checkBoxListener();


    //북마크
    const bookmark = document.querySelectorAll(".bookmark-icon");
    //북마크 이벤트
    bookmark.forEach(function (icon) {
        icon.addEventListener("click", function () {
            toggleBookmark(this);
        });
    });
}

//체크박스 이벤트
function checkBoxListener() {
    const allCb = document.querySelector(".all_cb");
    const checkBoxes = document.querySelectorAll(".cb");

    //개별 체크박스 변경 시
    checkBoxes.forEach(cb => {   
        cb.addEventListener("change", function () {
            let allChecked = true;
            checkBoxes.forEach(function (box) {
                if (!box.checked) {
                    allChecked = false;
                }
            });
            allCb.checked = allChecked;
            totalPrice();
        });
    });

    //전체 체크박스 변경 시
    allCb.addEventListener("change", function () {    
        checkBoxes.forEach(cb => cb.checked = allCb.checked);
        totalPrice();
    });
}

//수량 변경 시 금액 변경
function calPrice(selectTag, index) {
    let qty = parseInt(selectTag.value);
    products[index].qty = qty;          // 배열의 상품 수량 변경

    const li = selectTag.closest("li");
    li.querySelector(".amt").textContent = "₩ " + (products[index].price * qty).toLocaleString();

    totalPrice();     //총계 갱신
}

//총계
function totalPrice() {
    let sum = 0;
    const checkBoxes = document.querySelectorAll(".cb");

    //체크 되어있을 때만 총계 계산
    checkBoxes.forEach((cb, i) => {
        if (cb.checked) {
            sum += products[i].qty * products[i].price;
        }
    });

    //총계 표시
    const totalPriceEls = document.querySelectorAll(".total-price");
    const spanTotalPrice = document.querySelector(".buy-wrap-btn span");

    totalPriceEls.forEach(price => price.textContent = "₩ " + sum.toLocaleString());
    spanTotalPrice.textContent = "₩ " + sum.toLocaleString();
}

//장바구니 담긴 개수 업데이트
function updateCartCount() {
    const cartcount = document.querySelector(".cart-count");
    cartcount.textContent = products.length;
}

//위시리스트 담긴 개수 업데이트
function updateWishCount() {
    const wishcount = document.querySelector(".wish-count");
    wishcount.textContent = wishlist.length;
}

//장바구니 전체 삭제
function allitemDelete() {
    const allCb = document.querySelector(".all_cb");
    const checkBoxes = document.querySelectorAll(".cb");

    //체크박스가 모두 선택 시
    if (!allCb.checked) {
        alert("전체 선택 체크 박스를 먼저 체크해주세요.");
        return;
    }

    for (let i = checkBoxes.length - 1; i >= 0; i--) {
        if (checkBoxes[i].checked) {
            products.splice(i, 1);
        }
    }
    renderCart();
}

//장바구니 개별 상품 삭제
function itemDelete(index) {
    products.splice(index, 1);
    renderCart();
}

//위시리스트 숨겨진 창
function toggleBookmark(img) {
    const defaultIcon = './assets/icons/즐겨찾기1.png';
    const activeIcon = './assets/icons/즐겨찾기2.png';

    const listItem = img.closest('.list-item');
    const name = listItem.querySelector('p').textContent;
    const colors = listItem.querySelector('.item-color').textContent;
    const productImgUrl = listItem.querySelector('.list-item-img').src;
    const wishlisttitle = document.querySelector(".wishlist-title");

    const wishproduct = {
        img: productImgUrl,
        title: name,
        color: colors
    };

    const index = wishlist.findIndex(item =>
        //북마크 클릭 상품 -> 위시리스트 존재 여부
        item.img === wishproduct.img && item.title === wishproduct.title && item.color === wishproduct.color
    );

    if (index === -1) {   // 추가
        wishlist.push(wishproduct);    
        img.setAttribute('src', activeIcon);
        updateWishCount();
        wishlisttitle.textContent = "위시리스트에 저장되었습니다";

        hiddenWish(wishproduct, "이(가) 위시리스트에 저장되었습니다.");
    }
    else {                // 제거
        wishlist.splice(index, 1);
        img.setAttribute('src', defaultIcon);
        updateWishCount();
        wishlisttitle.textContent = "위시리스트에서 제거되었습니다";

        hiddenWish(wishproduct, "이(가) 위시리스트에서 제거되었습니다.");
    }
}


//위시리스트 렌더링
function renderWish() {
    const wishlistWrap = document.getElementById("wishlist-wrap");
    const cartWrap = document.getElementById("cart-wrap");

    //화면 전환
    cartWrap.style.display = "none";
    wishlistWrap.style.display = "block";
    wishlistWrap.innerHTML = "";

    // 위시리스트가 비었을 때
    if (wishlist.length === 0) {
        wishlistWrap.innerHTML = `
                <p style='text-align:center; padding:50px 0; font-size:18px; margin-top:200px;'>
                    위시리스트에 저장된 제품이 없습니다.
                </p>
                <div class="wish-btn"><a href="./index.html"><button>쇼핑 계속하기</button></a></div>`;
        updateWishCount();
        return;
    }

    // 위시리스트 생성
    const ul = document.createElement("ul");
    ul.classList.add("cart-list-ul");
    ul.classList.add("wish-item");

    wishlist.forEach(function (item) {
        const li = document.createElement("li");
        li.innerHTML = `
                <div class = "item-box-style">
                    <img class="list-item-img" src="${item.img}" alt="${item.title}">
                    <p>${item.title}</p>
                    <p class="item-color" style = "margin-bottom:10px;">${item.color || ''}</p>
                    <button class="item-delete" onclick="deleteWishlistItem(this)">북마크 취소</button>
                </div>`;
        ul.appendChild(li);
    });

    wishlistWrap.appendChild(ul);
    updateWishCount();

}

//위시리스트 숨김 창
function hiddenWish(wishproduct, message) {
    const panel = document.getElementById('wishlist-panel');
    const panelContent = document.getElementById('wishlist-content');

    panelContent.innerHTML = `
                        <div class="wishlist-item">
                            <img src="${wishproduct.img}" alt="${wishproduct.title}">
                            <p>"${wishproduct.title}"${message}</p>
                        </div>`;

    panel.classList.add('show');
    clearTimeout(panel._hideTimeout);
    panel._hideTimeout = setTimeout(() => panel.classList.remove('show'), 3000);
}

//위시리스트 삭제
function deleteWishlistItem(button) {
    const li = button.closest("li");
    const img = li.querySelector(".list-item-img").getAttribute("src");
    const title = li.querySelector("p").textContent;
    const color = li.querySelector(".item-color").textContent;
    
    const index = wishlist.findIndex(item =>
        item.img === img && item.title === title && item.color === color
    );
    
    if (index !== -1) {
        wishlist.splice(index, 1);
    }
    
    renderWish();
}


//메뉴 버튼 실행 시 동작
function showCart() {
    document.getElementById("cart-wrap").style.display = "block";
    document.getElementById("wishlist-wrap").style.display = "none";
    renderCart();
}

function showWish() {
    document.getElementById("cart-wrap").style.display = "none";
    document.getElementById("wishlist-wrap").style.display = "block";
    renderWish();
}

//윈도우 로드 (초기 실행)
window.onload = function () {
    renderCart();

    //위시리스트 닫기
    document.getElementById('wishlist-close').addEventListener('click', () => {
        const panel = document.getElementById('wishlist-panel');
        clearTimeout(panel._hideTimeout);
        panel.classList.remove('show');
    });

    //부가정보 js
    const toggleBtn = document.querySelectorAll('.toggle-btn');
    toggleBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.closest('.check-info-cnt').querySelector('.check-content');
            content.classList.toggle('show');
        });
    });
}