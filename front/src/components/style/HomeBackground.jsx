/*This file handles the style of the back ground image*/
import styled from 'styled-components';
import sky from '../../pictures/background.jpg';

export const Background = styled.div`
    background-image: url(${sky});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow:auto
`;