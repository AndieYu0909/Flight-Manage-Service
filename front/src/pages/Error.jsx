//this page throws the error image when user going to a unkonwn page
import styled from 'styled-components';
import ErrorPage from '../pictures/404_Page.png';

export const Content = styled.div`
    background-image: url(${ErrorPage});
    border: 1px solid #000;
    width: 2000px;
    height: 2000px;
`;

export const Error = () => {
    return (
        <>
            <Content>
                <img src = {ErrorPage} alt = "Error"/>
            </Content>

        </>
    );

}