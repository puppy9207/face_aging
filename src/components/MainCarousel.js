import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Card } from '@material-ui/core'
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import imgA from '../static/Main1.png';
import imgB from '../static/Main2.png';
import imgC from '../static/Main3.png';
import styled from 'styled-components';
const CarouselBlock = styled.div`
    color:white;
`;

function MainCarousel(props) {
    var items = [
        {
            url:imgA
        },
        {
            url:imgB
        },
        {
            url:imgC
        }
    ]

    return<CarouselBlock ><Carousel timeout={700} indicators={false} navButtonsAlwaysVisible={true}>
    {
        items.map( (item, i) => <Item key={i} item={item} /> )
    }
    </Carousel></CarouselBlock>
  }
const useStyles = makeStyles({
    media: {
        height: 0,
        paddingTop: '40%',
      },
  });
  
function Item(props)
{
    const classes = useStyles();
    return (
            <CardMedia
            className={classes.media}
            image={props.item.url}
            title="card img"
            style={{backgroundSize:"100%"}}
            />
    )
}
export default MainCarousel;