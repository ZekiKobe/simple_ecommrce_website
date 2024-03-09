import React, { useContext } from 'react';
import "./CSS/category.css";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Items/item";
import { HomeContext } from "../Context/homeContext";

const Category = (props)=> {
  const { all_product } = useContext(HomeContext);
  return (
    <div className="category">
      <img className="category-banner" src={props.banner} alt="" />
      <div className="category-indexSort">
        <p>
          <span>Showing 1-4</span> out of 6 Categories
        </p>
        <div className="category-sort">
          Sory by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="category-products">
        {all_product.map((item, i)=>{
          if (props.category === item.category) {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                description={item.description}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="category-loadmore">Explore More</div>
    </div>
  );
}

export default Category;
