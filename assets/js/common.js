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


// 🔧 헤더가 삽입된 후에 작동시켜야 할 기능들
function handleHeaderAfterLoad() {
  const logo = document.getElementById("logo-img");
  const icons = document.querySelectorAll(".icon-img");

  if (!logo || icons.length < 3) return;

  function switchToDarkIcons() {
    logo.src = "./assets/logo/logo2.png";
    icons[0].src = "./assets/icons/search2.png";
    icons[1].src = "./assets/icons/mypage2.png";
    icons[2].src = "./assets/icons/cart2.png";
  }

  function switchToLightIcons() {
    logo.src = "./assets/logo/logo1.png";
    icons[0].src = "./assets/icons/search1.png";
    icons[1].src = "./assets/icons/mypage1.png";
    icons[2].src = "./assets/icons/cart1.png";
  }

  // 📄 서브페이지일 경우 항상 다크 아이콘
  if (document.body.classList.contains("sub-page")) {
    switchToDarkIcons();
  }

  // 🏠 메인페이지일 경우 스크롤에 따라 바뀜
  if (document.body.classList.contains("main-page")) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        switchToDarkIcons();
      } else {
        switchToLightIcons();
      }
    });
  }
}
