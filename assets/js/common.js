// 🔄 헤더/푸터 불러오기
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  // 헤더 삽입
  fetch("../components/header.html")
    .then(res => res.text())
    .then(data => {
      header.innerHTML = data;
      handleHeaderAfterLoad(); // 헤더 로딩 후 기능 적용
    });

  // 푸터 삽입
  fetch("../components/footer.html")
    .then(res => res.text())
    .then(data => {
      footer.innerHTML = data;
    });
});


// 헤더 로딩 후 기능 정의
function handleHeaderAfterLoad() {
  const body = document.body;
  const logo = document.getElementById("logo-img");
  const icons = document.querySelectorAll(".icon-img");
  const navLinks = document.querySelectorAll(".main-nav >a");
  const headerEl = document.querySelector("header");

  console.log(navLinks)

  const searchBtn = document.getElementById("searchBtn");
  const closeBtn = document.getElementById("closeSearchBtn");

  if (!logo || icons.length < 3 || !headerEl || navLinks.length === 0) {
    console.warn("❌ 필요한 요소를 찾을 수 없습니다.");
    return;
  }

  // 아이콘 + 메뉴를 다크 모드로 전환
  function switchToDarkIcons() {
    logo.src = "/assets/logo/logo2.png";
    icons[0].src = "/assets/icons/search2.png";
    icons[1].src = "/assets/icons/mypage2.png";
    icons[2].src = "/assets/icons/cart2.png";
    headerEl.classList.add("dark-mode");

    navLinks.forEach(link => {
      link.style.setProperty("color", "black", "important");
    });
  }

  // 아이콘 + 메뉴를 라이트 모드로 전환
  function switchToLightIcons() {
    logo.src = "/assets/logo/logo1.png";
    icons[0].src = "/assets/icons/search1.png";
    icons[1].src = "/assets/icons/mypage1.png";
    icons[2].src = "/assets/icons/cart1.png";
    headerEl.classList.remove("dark-mode");

    navLinks.forEach(link => {
      link.style.color = "white";
    });
  }

  // ✅ 메인 페이지 스크롤 이벤트 처리
  if (body.classList.contains("main-page")) {
    const onScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 300 && !body.classList.contains("scrolled")) {
        body.classList.add("scrolled");
        switchToDarkIcons();
      } else if (scrollY <= 300 && body.classList.contains("scrolled")) {
        body.classList.remove("scrolled");
        switchToLightIcons();
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // 로딩 시 초기화
  }

  // ✅ 서브페이지는 항상 다크모드
  if (body.classList.contains("sub-page")) {
    switchToDarkIcons();
  }

  // ✅ 검색 열기 버튼
  if (searchBtn) {
    searchBtn.addEventListener("click", openSearch);
  }

  // ✅ 검색 닫기 버튼
  if (closeBtn) {
    closeBtn.addEventListener("click", closeSearch);
  }

  // 전역에서 사용 가능하도록 등록
  window.switchToDarkIcons = switchToDarkIcons;
  window.switchToLightIcons = switchToLightIcons;
}


// 🔍 검색창 열기
function openSearch() {
  const body = document.body;
  const searchLayer = document.getElementById("searchLayer");

  if (body.classList.contains("main-page")) {
    body.classList.add("scrolled"); // 강제 다크모드
  }

  switchToDarkIcons();

  if (searchLayer) {
    searchLayer.style.display = "flex";
  }
}

// 🔒 검색창 닫기
function closeSearch() {
  const body = document.body;
  const searchLayer = document.getElementById("searchLayer");

  if (searchLayer) {
    searchLayer.style.display = "none";
  }

  if (body.classList.contains("main-page") && window.scrollY < 300) {
    body.classList.remove("scrolled");
    switchToLightIcons();
  }
}
