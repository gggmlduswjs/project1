
  const products3 = [
    { name: "던스 01", price: "₩340,000", image: "./assets/main/image_95.jpg" },
    { name: "브리즈비 01(BR)", price: "₩279,000", image: "./assets/main/image_96.jpg" },
    { name: "누메르 01(BLG)", price: "₩279,000", image: "./assets/main/image_97.jpg" },
    { name: "지켈 01", price: "₩300,000", image: "./assets/main/image_98.jpg" },
    { name: "주드 01(GR)", price: "₩279,000", image: "./assets/main/image_99.jpg" },
  ];

  const productRow = document.getElementById("productRow");

  products3.forEach(product => {
    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-text">
        <div class="name">${product.name}</div>
        <div class="price">${product.price}</div>
      </div>
    `;
    productRow.appendChild(card);
  });
