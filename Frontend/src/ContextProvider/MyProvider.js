import { createContext, useState } from "react";

const myContext=createContext()

const MyProvider=({children})=>{
    const [openModal, setOpenModal]=useState(false)

    const updateModalState=(val)=>{
        setOpenModal(val)
    }
    return <myContext.Provider value={{openModal, updateModalState}}>{children}</myContext.Provider>


}

export {myContext, MyProvider}