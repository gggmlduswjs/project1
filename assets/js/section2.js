
    // 상품 정보 배열
    const productData = [
      {
        name: "큐비드 02(Y)",
        price: "₩350,000",
        image: "./assets/main/image_7.jpg",
        thumb: "./assets/main/image_7.jpg"
      },
      {
        name: "타스 02",
        price: "₩350,000",
        image: "./assets/main/image_8.jpg",
        thumb: "./assets/main/image_8.jpg"
      },
      {
        name: "피코 02",
        price: "₩370,000",
        image: "./assets/main/image_9.jpg",
        thumb: "./assets/main/image_9.jpg"
      },
      {
        name: "로랑 T1",
        price: "₩340,000",
        image: "./assets/main/image_10.jpg",
        thumb: "./assets/main/image_10.jpg"
      },
      {
        name: "미타니 BR3",
        price: "₩290,000",
        image: "./assets/main/image_11.jpg",
        thumb: "./assets/main/image_11.jpg"
      },
      {
        name: "멜로즈 IV3",
        price: "₩340,000",
        image: "./assets/main/image_12.jpg",
        thumb: "./assets/main/image_12.jpg"
      },
      {
        name: "루비 반 BR3",
        price: "₩380,000",
        image: "./assets/main/image_13.jpg",
        thumb: "./assets/main/image_13.jpg"
      },
      {
        name: "캐럿 02",
        price: "₩360,000",
        image: "./assets/main/image_14.jpg",
        thumb: "./assets/main/image_14.jpg"
      },
      {
        name: "온링 02",
        price: "₩360,000",
        image: "./assets/main/image_15.jpg",
        thumb: "./assets/main/image_15.jpg"
      },
      {
        name: "브리오레뜨 02",
        price: "₩550,000",
        image: "./assets/main/image_16.jpg",
        thumb: "./assets/main/image_16.jpg"
      },
      {
        name: "밀키웨이 02P",
        price: "₩430,000",
        image: "./assets/main/image_17.jpg",
        thumb: "./assets/main/image_17.jpg"
      },
    ];

    const slideContainer = document.getElementById("slideContainer");
    const productList = document.getElementById("productList");

    productData.forEach((product, index) => {
      // 상단 슬라이드
      const slide = document.createElement("div");
      slide.className = "slide-item";
      slide.id = `slide-${index}`;
      slide.innerHTML = `<img src="${product.image}" alt="모델 ${index + 1}">
      <div class="slide_text">
        <div class="name">${product.name}</div>
        <div class="price">${product.price}</div>
        <a href="./cart.html">위시리스트에 추가하기</a>
      </div>
                        `;
      slideContainer.appendChild(slide);

      // 하단 썸네일
      const card = document.createElement("div");
      card.className = "product-card";
      if (index === 0) card.classList.add("active");

      card.innerHTML = `
        <img src="${product.thumb}" alt="${product.name}" />
        
      `;

      card.addEventListener("click", () => {
        // 슬라이드 위치로 스크롤 이동
        const target = document.getElementById(`slide-${index}`);
        slideContainer.scrollTo({
          left: target.offsetLeft - 10,
          behavior: 'smooth'
        });

        // 선택된 썸네일 표시
        document.querySelectorAll(".product-card").forEach(el => el.classList.remove("active"));
        card.classList.add("active");
      });

      productList.appendChild(card);
    });
 