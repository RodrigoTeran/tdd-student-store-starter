import { useEffect, useState } from "react";
import "./Filter.css";

export default function Filter({
  productsPerm = [],
  setProducts,
  products = [],
}) {
  const [currCategory, setCurrCategory] = useState("all");
  const handleCategorieChange = (category) => {
    setCurrCategory(category);
    if (category == "all") {
      setProducts(productsPerm);

      return;
    }
    let aux = [];
    for (let i = 0; i < productsPerm.length; i++) {
      if (productsPerm[i].category == category) {
        aux.push(productsPerm[i]);
      }
    }
    setProducts(aux);
  };

  const search = (array, text) => {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      text = text.toLocaleLowerCase();
      let itemName = array[i].name.toLocaleLowerCase();
      let n = itemName.search(text);
      if (n !== -1) {
        newArray.push(array[i]);
      }
    }
    return newArray;
  };

  const handleIndividualSearch = (e) => {
    const text = e.target.value;

    if (text == "") {
        handleCategorieChange(currCategory);
      return;
    }

    let aux = [];
    aux = search(products, text);
    setProducts(aux);
  };

  useEffect(()=> {
    handleCategorieChange("all");
  }, []);

  return (
    <div className="filter">
      <div className="filter-search">
        <input
          onChange={handleIndividualSearch}
          type="text"
          placeholder="Search"
        />
        <button title="Search">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
          </svg>
        </button>
      </div>
      <div className="filter-categories">
        <div
          onClick={() => {
            handleCategorieChange("all");
          }}
          className={`${currCategory == "all" && "selected-category"} category`}
        >
          All Categories
        </div>
        <div
          onClick={() => {
            handleCategorieChange("clothing");
          }}
          className={`${
            currCategory == "clothing" && "selected-category"
          } category`}
        >
          Clothing
        </div>
        <div
          onClick={() => {
            handleCategorieChange("food");
          }}
          className={`${
            currCategory == "food" && "selected-category"
          } category`}
        >
          Food
        </div>
        <div
          onClick={() => {
            handleCategorieChange("accessories");
          }}
          className={`${
            currCategory == "accessories" && "selected-category"
          } category`}
        >
          Accessories
        </div>
        <div
          onClick={() => {
            handleCategorieChange("tech");
          }}
          className={`${
            currCategory == "tech" && "selected-category"
          } category`}
        >
          Tech
        </div>
      </div>
    </div>
  );
}
