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
  height: 100%;

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
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

    return<CarouselBlock><Carousel>
    {
        items.map( (item, i) => <Item key={i} item={item} /> )
    }
    </Carousel></CarouselBlock>
  }
const useStyles = makeStyles({
    media: {
        height: 0,
        paddingTop: '43%',
      },
  });
  
function Item(props)
{
    const classes = useStyles();
    return (
        <Card>
            <CardMedia
            className={classes.media}
            image={props.item.url}
            title="card img"
            />
        </Card>
    )
}
export default MainCarousel;