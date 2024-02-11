import { createSlice } from "@reduxjs/toolkit";


const modalSlice = createSlice({
    name:"modal",
    initialState:{
        isModalOpen:false,
        clickedCard:[],
    },
    reducers:{
        showModal: (state)=>{
            state.isModalOpen = !state.isModalOpen;
        },
        setClickedCard:(state,action) => {
            state.clickedCard = action.payload;
        }
    }

})

export const {showModal,setClickedCard} = modalSlice.actions;
export default modalSlice.reducer;