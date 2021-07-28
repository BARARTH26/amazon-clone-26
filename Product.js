import React from 'react';
import "./Product.css";
import StarIcon from '@material-ui/icons/Star';
import {useStateValue} from "./StateProvider"; 



function Product({id,title,price,rating,image}) 
{
    const [{basket},dispatch] = useStateValue();
    const addToBasket = () => {
        //dispatch the item into the datalayer
        dispatch({
            type : "ADD_TO_BASKET",
            item : {
                id : id,
                title : title,
                price : price,
                rating : rating,
                image : image,
            },
        });
    }

    return (
        <div className="product">
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {Array(rating).fill().map((_,i)=>(
                        <p><StarIcon/></p>
                    ))}
                    
                </div>
            </div>
            <img src={image} />
            <button onClick={addToBasket}>Add to basket</button>
          
        </div>
    )
}

export default Product
