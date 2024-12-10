import {styled} from 'styled-components'


export const InputWrapper=styled.div`
display: flex;
flex-direction: column;
gap:10px;
${'' /* justify-content:center;
align-items:center; */}
margin:0 20px;

`

export const InputElement=styled.input`
width:50%;
height:30px;
`

export const AddButton=styled.button`
width:25%;
height:30px;
font-family: Motiva-Sans;
background-color: white;
color: black;
font-size:16px;
border-radius: 50px;
cursor: pointer;
&:hover{
    background-color: #E1D9D1;
}
`

export const TabButton=styled.button`
border: none;
background-color: white;
font-family: Motiva-Sans;
font-size:24px;
cursor:pointer;
${'' /* border-bottom:2px solid black;  */}
border-bottom : ${(props)=>(props.isActive ? '2px solid black' : '' )};
&:hover{
    background-color: #E1D9D1;
    
}

`

export const Tab=styled.div`
display:flex;
justify-content:space-evenly;
`

export const BodyLayout=styled.div`
display: flex;
flex-direction: column;
gap:50px;
margin:10px 0;
`

export const CardLayout=styled.div`
display: grid;
border:1px solid black;
border-radius:50px;
grid-template-columns: 2fr 1fr;
grid-gap:10px;
font-size:24px;
font-family: Motiva Sans;
`

export const Title=styled.h3`
margin:0;
`

export const Description=styled.div`

`

export const CheckBox=styled.div`

`