import React,{useState,useEffect} from 'react';
import CheckoutProduct from './CheckoutProduct';
import "./Payment.css";
import { useStateValue } from './StateProvider';
import {Link,useHistory} from "react-router-dom";
import {CardElement,useStripe,useElements} from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import {getBasketTotal} from"./reducer";
import axios from "axios";  //npm i axios (terminal Function)

function Payment() {

    const [{basket,user},dispatch] = useStateValue("");

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded,setSucceeded] = useState(false);
    const[processing ,setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const[clientSecret,setClientSecret] = useState(true);

    useEffect(() => {
        //Generate the special stripe secret which aloow us to charge a customer
        const getClientSecret = async() => {
            const response = await axios({
                method : "post",
                url : `/payments/create?total=${getBasketTotal(basket) * 100}`
            })
            setClientSecret(response.data.clientServer);
        }
        getClientSecret();
    }, [basket])

    const handleSubmit =async (e) => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientServer,{
            payment_method:{
                card : elements.getElement(CardElement)
            }
        }).then((paymentInternet)=>{
            //paymentInternet = payment Confirmation
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            history.replace("/orders");
        })
    }
    const handleChange = e => {
        //listen for changes in the card Element
        //and display any errors as the customer types their card details

        setDisabled(e.empty);
        setError(e.error ? e.error.message : "")
    }
    return (
        <div className= "payment">
            <div className="payment__container">
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} Items</Link>)
                </h1>
                <div className ="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123,learn React Course</p>
                        <p>Self Learning</p>
                    </div>
                </div>
                <div className ="payment__section">
                    <div className="payment__title">
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item => (
                            <CheckoutProduct 
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}

                            />
                        ))}
                    </div>
                </div>
                <div className ="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment__priceContainer">
                            <CurrencyFormat
                                renderText={(value)=> (
                                    <>
                                        <h4>
                                            Order Total : <strong>{value}</strong>
                                        </h4>
                                    </>
                                )}
                                decimalScale = {2}
                                value={getBasketTotal(basket)}
                                displayType = {"text"}
                                thousandSeparator = {true}
                                prefix = {"$"}
                            />
                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                            </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
