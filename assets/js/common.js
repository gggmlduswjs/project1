 
// 🔄 헤더/푸터 불러오기
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  // 헤더 삽입
  fetch("../components/header.html")
    .then(res => res.text())
    .then(data => {
      header.innerHTML = data;

      // 헤더 로딩 후 실행할 기능
      handleHeaderAfterLoad();
 
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

  console.log("✅ 헤더 로딩 후 실행됨");
  console.log("✅ logo:", logo);
  console.log("✅ icons.length:", icons.length);

  if (!logo || icons.length < 3) {
    console.log("❌ logo 또는 icons 못 찾음");
    return;
  }

  function switchToDarkIcons() {
    console.log("▶️ switchToDarkIcons 실행");
    logo.src = "/assets/logo/logo2.png";
    icons[0].src = "/assets/icons/search2.png";
    icons[1].src = "/assets/icons/mypage2.png";
    icons[2].src = "/assets/icons/cart2.png";
  }

  function switchToLightIcons() {
    console.log("▶️ switchToLightIcons 실행");
    logo.src = "/assets/logo/logo1.png";
    icons[0].src = "/assets/icons/search1.png";
    icons[1].src = "/assets/icons/mypage1.png";
    icons[2].src = "/assets/icons/cart1.png";
  }

  const body = document.body;

  // 서브페이지는 무조건 다크
  if (body.classList.contains("sub-page")) {
    switchToDarkIcons();
  }

  // 메인 페이지: 스크롤 이벤트로 아이콘/클래스 변경
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
    onScroll(); // 페이지 로드시도 초기화
  }
}