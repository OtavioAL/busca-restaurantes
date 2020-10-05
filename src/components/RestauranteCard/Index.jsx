import React from 'react';
import ReactStars from "react-rating-stars-component";
import { Restaurant, RestauranteInfo, Title, RestaurantePhoto, Address } from './styles';
import restaurante from '../../assets//restaurante-fake.png';

const RestauranteCard = ({ restaurant, onClick }) => (
    <Restaurant onClick={onClick}>
        <RestauranteInfo>
            <Title>{restaurant.name}</Title>
           <ReactStars count={5} isHalf edit={false} value={restaurant.rating} activeColor="#e7711c"/>
            <Address>{restaurant.vicinity || restaurant.formatted_address}</Address>
        </RestauranteInfo>
        <RestaurantePhoto src={restaurant.photos ? restaurant.photos[0].getUrl() : restaurante} alt="Foto do restaurante" />
    </Restaurant>
);

export default RestauranteCard;