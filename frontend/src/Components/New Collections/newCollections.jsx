import React, { useEffect, useState } from "react";
import "./newCollections.css";
import Item from "../Items/item";

function NewCollections() {
  const [new_collection, setNewCollections] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/newcollections")
      .then((response) => response.json())
      .then((data) => setNewCollections(data));
  }, []);
  return (
    <div className="new-collections">
      <h1>Recent Products</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => {
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
        })}
      </div>
    </div>
  );
}

export default NewCollections;
