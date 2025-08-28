import React, {useContext} from "react";
import { Button, ButtonLayout, ModalContent, ModalLayout } from "./Modal.styles";
import { Link } from "react-router-dom";
import { myContext } from "../ContextProvider/MyProvider";


const Modal=()=>{
const {openModal, updateModalState}=useContext(myContext)
    const closeModal=()=>{
        updateModalState(false)
    }
    console.log('Check modal state', openModal)
    
    return   <ModalLayout>
<ModalContent>Check Modal</ModalContent>
<ButtonLayout>
<Link onClick={()=>closeModal}>Yes</Link>
<Button onClick={()=>closeModal}>No</Button>
</ButtonLayout>
        </ModalLayout>
    
}

export default Modal