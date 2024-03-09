import React, { useContext } from 'react';
import { HomeContext } from '../Context/homeContext';
import { useParams } from 'react-router-dom';
import BreadCrum from '../Components/BreadCrum/BreadCrum';
import ProductDisplay from '../Components/ProductDisplay/productDisplay';
import DescriptionBox from '../Components/descriptionBox/descriptionBox';
import RelatedProduct from '../Components/relatedProduct/relatedProduct';

function Products() {
    const { all_product } = useContext(HomeContext);
    const { productId } = useParams();
    
    // Check if all_product is available and productId is valid
    if (!all_product || !productId) {
        return <div>Loading...</div>; // or render a loading indicator
    }

    const product = all_product.find((e) => e.id === Number(productId));

    // Check if product is found
    if (!product) {
        return <div>Product not found</div>; // or handle the case when product is not found
    }

    // Product and all_product are available, render the BreadCrum and ProductDisplay components
    return (
        <div>
            <BreadCrum product={product} />
            <ProductDisplay product={product}/>
            <DescriptionBox/>
            <RelatedProduct product={product}/>
        </div>
    );
}

export default Products;
