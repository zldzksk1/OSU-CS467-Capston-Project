import React, { Fragment, useContext } from 'react';
import { Container, Navbar } from 'react-bootstrap';

import GreetContext from '../../context/NavText/GreetContext';

const RegLoginNav = () => {
    const { greeting } = useContext(GreetContext);

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 4,
                marginTop: 0
            }}
        />
    );

    return (
        <Fragment>
            <Navbar>
                <Container className="justify-content-end" style={{paddingRight:'2%', marginBottom:-10}}>
                    <img alt='banana' src = {require("../../assets/logo_small_two.png")}/>
                </Container>
            </Navbar>
            <Navbar style = {{paddingBottom:0}}>
                <Container>
                    <Navbar.Brand style={{ 'padding': '0.3rem' }}><h3>{greeting}</h3></Navbar.Brand>
                </Container>
            </Navbar>
            <Container>
                <ColoredLine color = "#FFC300"/>
            </Container> 
        </Fragment>
    )
};

export default RegLoginNav;
