import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    width: 500px;
    justify-content: space-evenly;
    background-color: #333;

    a {
        text-decoration: none;
        color: #fff;
        font-size: 18px;
        margin-right: 15px;

        &:hover {
            color: #f6c8c8ff;
        }
    }
`;