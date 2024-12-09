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