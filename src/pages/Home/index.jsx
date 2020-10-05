import React, { useState } from 'react';
import { Container, Search, Logo, Wrapper, CarrouselTitle, Carousel, ModalTitle, ModalContent } from  './styles';
import logo from '../../assets/logo.svg';
import TextField, { Input } from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import restaurante from '../../assets/restaurante-fake.png';
import { Card, RestauranteCard, Modal, Map } from '../../components';
import { useSelector } from 'react-redux';

// Minha chave do google AIzaSyDhaJCNf-vl8NAiYCH_ZGW7JoVq4O8_rWQ
const Home = () => {
    const [inputValue, setInputValue] = useState('');
    const [query, setQuery] = useState(null);
    const [modalOpened, setModalOpened] = useState(false);
    const [placeId, setPlaceId] = useState(null);
    const { restaurants, restaurantSelected } = useSelector((state) => state.restaurants);
    const settings = {
        dots: false,
        infinite: true,
        autoplay:true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        adaptiveHeight: true,
    };

    function handleKeyPress(e){
        if(e.key === 'Enter'){
            setQuery(inputValue);
        }
    }

    function handleOpenModal(placeId){
        setPlaceId(placeId);
        setModalOpened(true);
    }

    return (
        <Wrapper>
            <Container>
                <Search>
                    <Logo src={logo} alt=""/>
                    <TextField
                        label='Pesquisar Restaurante'
                        outlined
                        trailingIcon={<MaterialIcon role="button" icon="search"/>}
                        >
                        <Input
                        onKeyPress={handleKeyPress}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)} />
                    </TextField>
                    <CarrouselTitle>Na sua Área:</CarrouselTitle>
                    <Carousel {...settings}>
                        {restaurants.map((restaurant) => <Card key={restaurant.place_id} photo={restaurant.photos ? restaurant.photos[0].getUrl() : restaurante} title={restaurant.name} /> )}
                    </Carousel>
                    {/* <button onClick={() => setModalOpened(true)}>Abrir Modal</button> */}
                </Search>
                {restaurants.map((restaurant) => <RestauranteCard onClick={() => handleOpenModal(restaurant.place_id)} restaurant={restaurant}/> )}
                
            </Container>
            <Map query={query} placeId={placeId} />
            <Modal open={modalOpened} onClose={() => setModalOpened(!modalOpened)}>
                <ModalTitle>{restaurantSelected?.name}</ModalTitle>
                <ModalContent>{restaurantSelected?.formatted_phone_number}</ModalContent>
                <ModalContent>{restaurantSelected?.formatted_address}</ModalContent>
                <ModalContent>{restaurantSelected?.opening_hours?.open_now ? 'Aberto Agora' : 'Fechado neste momento'}</ModalContent>

            </Modal>
        </Wrapper>
        
    );
    
};

export default Home;