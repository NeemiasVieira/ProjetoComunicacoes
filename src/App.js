import styled from "styled-components"

export const Style = styled.main `

    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    flex-flow: column wrap;

    header{
        width: 100vw;
        background-color: #039;
        color: #fff;
        display: flex;
        justify-content: center;
        flex-flow: column wrap;
        align-items: center;
        height: 75px;
        padding: 10px 0;

        h1{
            font-size: 1.5rem;
            margin: 5px 0;
        }

        h2{
            font-size: 1.1rem;
            margin: 5px 0;
        }
    }


    section{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column wrap;
        gap: 20px;
    }

    .divInput{
        display: flex;
        justify-content: center;
        align-items: flex-start;
        gap: 20px;
        width: 200px;


        input[type="number"] {
        width: 50px; 
        padding: 10px; 
        border: 1px solid #ccc; 
        border-radius: 5px; 
        outline: none; 
        transition: border-color 0.3s; 
}

       
        input[type="number"]:focus {
        border-color: #007bff; 
}


        label{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100px;
            height: 37px;
        }
    }

    .title{
        font-size: 1.7rem;
        font-weight: 700;
        margin-top: 50px;
    }

`