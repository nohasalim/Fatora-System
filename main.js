// ---------------
// Logic
// --------------

// Selectors
// inputs
const productName = document.querySelector("#productName");
const productPrice = document.querySelector("#productPrice");
const productTax = document.querySelector("#productTax");
const productAds = document.querySelector("#productAds");
const productDiscount = document.querySelector("#productDiscount");
const total = document.querySelector("#total");
const search = document.querySelector("input[type='search']");
//form button
const formBtn = document.querySelector("button");
// table
const tbody = document.querySelector("tbody");

// Vars
const products = JSON.parse(localStorage.getItem("products")) || [];
let updatedIndex;

// CRUD Operations

// 1- Add Function (Create )
const addProduct = (e) => {
  e.preventDefault();
  let name;
  if (isNaN(productName.value)) {
    name = productName.value;
  } else {
    productName.value = "";
  }

  if (
    Number(productPrice.value) > Number(productTax.value) &&
    Number(productPrice.value) > Number(productAds.value) &&
    Number(productPrice.value) / 2 >= Number(productDiscount.value)
  ) {
    const product = {
      name: name,
      price: productPrice.value,
      tax: productTax.value,
      ads: productAds.value,
      discount: productDiscount.value,
      total:
        Number(productPrice.value) +
        Number(productTax.value) +
        Number(productAds.value) -
        Number(productDiscount.value),
    };
    if (formBtn.innerText == "Add") {
      products.push(product);
    } else {
      products.splice(updatedIndex, 1, product);
      formBtn.innerText = "Add";
    }
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts(products);
    reset();
  }
};

//2- Display Function (Read)

const displayProducts = (array) => {
  tbody.innerHTML = "";
  array.forEach((product) => {
    const originalIndex = products.indexOf(product); // real index from main array

    tbody.innerHTML += `
      <tr>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.tax}</td>
        <td>${product.ads}</td>
        <td>${product.discount}</td>
        <td>${product.total}</td>
        <td class="d-flex align-items-center gap-3">
          <svg
            class="bin"
            onclick="deleteProduct(${originalIndex})"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            >
              <path
                d="M22.049 7.077a4 4 0 0 1-1.001 0c-.85-.09-1.822-.31-2.573-.38a62 62 0 0 0-4.764-.3c-1.612-.03-3.203 0-4.765.11l-4.614.31a.31.31 0 0 0 .12-.26c.12 0 .12-.5.14-.56q.114-.321.32-.591a1 1 0 0 1 .46-.34q1.186-.38 2.413-.591a26.5 26.5 0 0 1 3.734-.35c1.436-.1 2.878-.1 4.314 0c.948.055 1.887.21 2.803.46a.59.59 0 0 1 .35.37q.125.393.17.801a.36.36 0 0 0 .39.29a.34.34 0 0 0 .29-.39a3.8 3.8 0 0 0-.23-1.151a1.23 1.23 0 0 0-.73-.68a14.2 14.2 0 0 0-3.003-.701s-.58-1.512-.59-1.522A3.8 3.8 0 0 0 14.21.411a2.64 2.64 0 0 0-1.651-.4a5.1 5.1 0 0 0-1.522.36c-.507.221-.95.565-1.291 1a7.6 7.6 0 0 0-.66 1.843c-.281 0-.581.08-.862.14a15.3 15.3 0 0 0-3.143 1a1.85 1.85 0 0 0-.64.491c-.224.3-.387.64-.48 1.001q-.092.346-.14.7a.38.38 0 0 0 .09.281l.07.02c-3.544.25-2.273.831-2.003.821q.339-.02.671-.08h6.336c1.301 0 2.623-.06 3.954-.07h2.643c1 0 1.891 0 2.822.06c.741 0 1.722.19 2.573.24c.399.048.802.048 1.201 0a.34.34 0 0 0 .28-.39a.352.352 0 0 0-.41-.35m-11.59-5.065a2.5 2.5 0 0 1 .77-.47a4.8 4.8 0 0 1 1.442-.341a1.63 1.63 0 0 1 1 .15c.344.198.649.456.902.76c.05.07.27.591.44.942a30 30 0 0 0-3.543-.04c-.48 0-.971 0-1.482.07c.23-.37.38-1.011.47-1.071m10.191 6.646a.31.31 0 0 0-.43 0a.32.32 0 0 0 0 .38v.37a39 39 0 0 1-.571 4.765c-.34 2.062-.751 4.164-1.061 5.235c-.14.491-.24 1.001-.41 1.482c-.092.28-.227.544-.401.78c-.41.492-.975.827-1.602.952a9 9 0 0 1-3.153.21c-1.421-.15-3.003 0-4.434-.19a4.7 4.7 0 0 1-1.602-.52a1.83 1.83 0 0 1-.64-.842a8 8 0 0 1-.591-1.882c-.15-.83-.33-1.871-.51-3.002c-.42-2.663-.861-5.706-1.062-7.007a.36.36 0 0 0-.39-.3a.35.35 0 0 0-.29.39c.16 1.321.51 4.364.86 7.007c.14 1.13.28 2.192.411 3.003a9.3 9.3 0 0 0 .61 2.162a2.93 2.93 0 0 0 1.022 1.381a5.6 5.6 0 0 0 2.002.68c1.461.25 3.003.07 4.494.23a10 10 0 0 0 3.593-.27a4 4 0 0 0 2.183-1.41c.22-.339.392-.706.51-1.092c.16-.5.25-1 .38-1.551a71 71 0 0 0 1.112-7.538c.124-.996.175-2 .15-3.003a.8.8 0 0 0-.18-.42"
              />
              <path
                d="M9.256 16.156c.14.841.31 1.582.42 2.112c.07.34.12.591.14.711c.061.3.321.26.511.17a.23.23 0 0 0 .16-.1v-.79c0-.541 0-1.302-.11-2.153c0-.46-.09-.94-.16-1.421c0-.24-.06-.48-.11-.71c-.2-1.122-.46-2.143-.61-2.814a.302.302 0 1 0-.601.08c0 .681 0 1.742.11 2.873c0 .24 0 .47.07.711c.03.39.1.87.18 1.331m5.586 2.813a.34.34 0 0 0 .34-.34c.05-.61.22-1.542.33-2.563c.07-.56.13-1.15.15-1.711c.06-1.352 0-2.523 0-2.913a.31.31 0 0 0-.508-.247a.3.3 0 0 0-.102.207c-.06.35-.29 1.32-.46 2.502c-.05.34-.08.71-.11 1.071c-.03.36 0 .73 0 1.091c0 1.001 0 1.952.08 2.563a.34.34 0 0 0 .28.34"
              />
            </g>
          </svg>
          <svg
            class="edit"
            onclick="editProduct(${originalIndex})"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m14.304 4.844l2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565l6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
            />
          </svg>
        </td>
      </tr>
    `;
  });
};

displayProducts(products);
// 3- Edit Function (Update)
const editProduct = (index) => {
  updatedIndex = index;
  let productToUpdate = products[index];
  productName.value = productToUpdate.name;
  productPrice.value = productToUpdate.price;
  productTax.value = productToUpdate.tax;
  productAds.value = productToUpdate.ads;
  productDiscount.value = productToUpdate.discount;
  total.value = productToUpdate.total;
  formBtn.innerText = "Save";
  calculateTotal();
};

//4- Delete Function (Delete)
const deleteProduct = (index) => {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  displayProducts(products);
};
// Search Function (BY NAME)
const handleSearch = (text) => {
  const filterproducts = products.filter((product) => {
    return product.name.toLowerCase().includes(text.toLowerCase());
  });

  displayProducts(filterproducts);
};

// Reset Inputs
const reset = () => {
  productName.value = "";
  productPrice.value = "";
  productTax.value = "";
  productAds.value = "";
  productDiscount.value = "";
  total.value = "";
  total.classList.remove("bg-danger", "bg-success");
};
// calculate Total Price
const calculateTotal = () => {
  const price = Number(productPrice.value) || 0;
  const tax = Number(productTax.value) || 0;
  const ads = Number(productAds.value) || 0;
  const discount = Number(productDiscount.value) || 0;

  const result = price + tax + ads - discount;
  total.value = result;

  // Validate each input separately
  const checkInput = (input, value) => {
    const isValid = price / 2 > value; // Individual check
    input.classList.toggle("border", !isValid);
    input.classList.toggle("border-3", !isValid);
    input.classList.toggle("border-danger", !isValid);
    return isValid;
  };

  const taxValid = checkInput(productTax, tax);
  const adsValid = checkInput(productAds, ads);
  const discountValid = checkInput(productDiscount, discount);

  // If all are valid → green total, else red total
  const allValid = taxValid && adsValid && discountValid;
  total.classList.toggle("bg-success", allValid);
  total.classList.toggle("bg-danger", !allValid);
};

//Events
// total with tax
productTax.addEventListener("keyup", calculateTotal); //keyup is akeyboard Event === input keyboard Event
// total with Ads
productAds.addEventListener("input", calculateTotal);
// total after Discount
productDiscount.addEventListener("input", calculateTotal);

//form submition
document.querySelector("form").addEventListener("submit", addProduct);
// Search Event
search.addEventListener("input", (e) => {
  if (e.target.value == "") {
    displayProducts(products);
  } else {
    handleSearch(e.target.value);
  }
});
