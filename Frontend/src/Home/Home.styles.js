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
margin : 10px;
`

export const BodyLayout=styled.div`
display: flex;
flex-direction: column;
gap:50px;
margin:10px 0;
`

export const HeaderLayout = styled.div`
display : flex; 
flex-direction : row;
justify-content : space-between;
`
export const UserNameWrapper = styled.div`
display :flex;
font-size : 24px;
justify-content : center;
align-items : center;
font-family : Motiva-Sans;
margin : 21px;
font-weight : bold;
`

export const LogoutButton = styled.button`
display : flex;
gap : 2px;
align-items : center;
justify-content : center;
border-radius : 50%;
background : bisque;
font-color : black;
cursor : pointer;

width : 10%;
margin : 21px;

&:hover{
    background-color : white;
}
`

export const LogoutSpan = styled.span`
font-size : 16px;
`

export const UserName = styled.span`
max-width : 300px;
white-space : nowrap;
text-overflow : ellipsis;
overflow : hidden;
`
export const CardLayout=styled.div`
display: grid;
border:1px solid black;
background: grey;
border-radius:50px;
grid-template-columns: 2fr 1fr;
grid-gap:10px;
font-size:24px;
font-family: Motiva Sans;
margin : 10px;
`

export const Title=styled.h3`
margin:0;
`

export const Description=styled.div`
color: #d1d5db;
`

export const CheckBox=styled.div`

`

export const EditTitle=styled.h3`
${'' /* margin:0; */}
margin-left:20px;
text-align:left;
`