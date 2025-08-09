
    // 슬라이드 관련 변수
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let current = 0;
    let slideInterval;

    // 슬라이드 활성화 함수
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        dots[i].classList.toggle('active', i === index);
      });
      current = index;
    }

    // 다음 슬라이드로 전환
    function nextSlide() {
      let next = (current + 1) % slides.length;
      showSlide(next);
    }

    // 자동 슬라이드 시작
    function startSlide() {
      slideInterval = setInterval(nextSlide, 5000); // 5초마다 슬라이드 전환
    }

    // 슬라이드 하단 점 클릭 이벤트 등록
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        clearInterval(slideInterval); // 수동 클릭 시 자동 슬라이드 멈춤
        startSlide(); // 다시 시작
      });
    });

    // 초기 실행
    showSlide(0);
    startSlide();

