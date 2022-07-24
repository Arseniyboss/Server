const container = document.querySelector(".container");

const getProducts = async () => {
  const response = await fetch("/api/products");
  const data = await response.json();

  const products = data
    .map((product) => {
      return `<p class="product">
    ${product.name}
    </p>`;
    })
    .join("");

  container.innerHTML = products;
};

window.addEventListener("DOMContentLoaded", getProducts);
