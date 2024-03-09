import React, {useContext} from "react";
import "./relatedProduct.css";
import Item from "../Items/item";
import { HomeContext } from "../../Context/homeContext";

function RelatedProduct(props) {
    const {product} =props;
    const { all_product } = useContext(HomeContext);
  return (
    <div className="relatedProduct">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedProduct-item">
        {all_product.map((item, i) => {
          if (product.category === item.category) {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                description={item.description}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
                category={item.category}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default RelatedProduct;
