import styled from 'styled-components';

export const Container = styled.main`
    width: 100%;
    max-width: 80%;
    margin: 0 auto;
    margin-top: 120px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`


export const Title = styled.h2`
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    width: 320px;
    margin-bottom: 20px;
    line-height: 44px;
    color: #000000;
`

export const TitleHighlight = styled.span`
    padding-left: 5px;
    padding-right: 5px;
    color: #0BA800;
`

export const TextContent = styled.p`
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    width: 420px;
    margin-bottom: 20px;
    color: #000000;
`
