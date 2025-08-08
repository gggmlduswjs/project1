// 🔄 헤더/푸터 불러오기
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  // 헤더 삽입
  fetch("../components/header.html")
    .then(res => res.text())
    .then(data => {
      header.innerHTML = data;
      handleHeaderAfterLoad(); // 헤더 로딩 후 실행
    });

  // 푸터 삽입
  fetch("../components/footer.html")
    .then(res => res.text())
    .then(data => {
      footer.innerHTML = data;
    });
});

function handleHeaderAfterLoad() {
  const logo = document.getElementById("logo-img");
  const icons = document.querySelectorAll(".icon-img");
  const body = document.body;
  const navLinks = document.querySelectorAll("nav a");

  // 헤더 요소
  const headerEl = document.querySelector("header");

  if (!logo || icons.length < 3 || !headerEl) {
    console.warn("❌ logo 또는 icons 또는 header를 찾지 못했습니다.");
    return;
  }

  // 아이콘을 다크 모드로 전환
  function switchToDarkIcons() {
    console.log("▶️ switchToDarkIcons 실행");

    logo.src = "/assets/logo/logo2.png";
    icons[0].src = "/assets/icons/search2.png";
    icons[1].src = "/assets/icons/mypage2.png";
    icons[2].src = "/assets/icons/cart2.png";

    headerEl.classList.add("dark-mode");

    // 메뉴 글자 검정색으로 변경
    navLinks.forEach(link => {
      link.style.color = "black";
    });
  }

  // 아이콘을 라이트 모드로 전환
  function switchToLightIcons() {
    console.log("▶️ switchToLightIcons 실행");

    logo.src = "/assets/logo/logo1.png";
    icons[0].src = "/assets/icons/search1.png";
    icons[1].src = "/assets/icons/mypage1.png";
    icons[2].src = "/assets/icons/cart1.png";

    headerEl.classList.remove("dark-mode");

    // 메뉴 글자 흰색으로 변경
    navLinks.forEach(link => {
      link.style.color = "white";
    });
  }

  // 메인 페이지: 스크롤에 따라 헤더 변경
  if (body.classList.contains("main-page")) {
    const onScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 300) {
        if (!body.classList.contains("scrolled")) {
          body.classList.add("scrolled");
          switchToDarkIcons();
        }
      } else {
        if (body.classList.contains("scrolled")) {
          body.classList.remove("scrolled");
          switchToLightIcons();
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // 로딩 시 적용
  }

  // 서브페이지: 항상 다크 모드
  if (body.classList.contains("sub-page")) {
    switchToDarkIcons();
  }

  // 검색 열기/닫기
  const searchBtn = document.getElementById("searchBtn");
  const closeBtn = document.getElementById("closeSearchBtn");

  if (searchBtn) {
    searchBtn.addEventListener("click", openSearch);
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", closeSearch);
  }

  // 외부에서도 사용 가능하게 등록
  window.switchToDarkIcons = switchToDarkIcons;
  window.switchToLightIcons = switchToLightIcons;
}

// 🔍 검색 열기
function openSearch() {
  console.log("🔍 openSearch 실행");

  const body = document.body;
  if (body.classList.contains("main-page")) {
    body.classList.add("scrolled");
  }

  switchToDarkIcons(); // 강제 다크 모드

  const searchLayer = document.getElementById("searchLayer");
  if (searchLayer) {
    searchLayer.style.display = "flex";
  }
}

// 🔒 검색 닫기
function closeSearch() {
  const searchLayer = document.getElementById("searchLayer");
  if (searchLayer) {
    searchLayer.style.display = "none";
  }

  const body = document.body;
  if (body.classList.contains("main-page")) {
    if (window.scrollY < 300) {
      body.classList.remove("scrolled");
      switchToLightIcons();
    }
  }
}
