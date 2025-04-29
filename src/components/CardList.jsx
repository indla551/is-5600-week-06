import Card from './Card';
import Button from './Button';
import Search from './Search';
import React, { useState, useEffect } from "react";

const CardList = ({ data }) => {

  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(data.slice(0, limit));

  useEffect(() => {
    setProducts(data.slice(offset, offset + limit));
  }, [offset, data]);

  const filterTags = (tagQuery) => {
    const filtered = data.filter(product => {
      if (!tagQuery) return true;
      return product.tags.find(({ title }) => title === tagQuery);
    });

    setOffset(0);
    setProducts(filtered);
  };

  return (
    <div className="cf pa2">
      <Search handlesearch={filterTags} />
      <div className="mt2 mb2">
        {products && products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button 
          text="Previous" 
          handleClick={() => setOffset(offset - limit)} 
        />
        <Button 
          text="Next" 
          handleClick={() => setOffset(offset + limit)} 
        />
      </div>
    </div>
  );
};

export default CardList;
