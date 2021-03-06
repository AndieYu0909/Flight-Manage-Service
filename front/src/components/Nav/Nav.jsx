import styled from "styled-components";

export const Nav = styled.nav`
    background-color: ${({backgroundColor}) => backgroundColor ?? '#00008B'};
    color: ${({color}) => color ?? 'white'};
    font-size: 20px;
    padding: 1em 1.5em;
    display: flex;
    justify-content: space-between;
`;