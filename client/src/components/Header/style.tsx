import styled from "styled-components";

export const Container = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #333;

    .connexion {
        width: 200px;
        display: flex;  
        justify-content: space-between;
        
        button {
            background-color: transparent;
            border: none;
            color: white;
            padding: 8px 16px;
            cursor: pointer;
            border-radius: 6px;
            transition: background-color 0.5s ease, color 0.3s ease;

            &:hover {
                background-color: #999;
                color: #d4cccc;
            }
        }
    }
`;