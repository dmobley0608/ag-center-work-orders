import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
    quoteDate: new Date().toLocaleDateString(),
    startDate: '',
    endDate: '',
    startTime: null,
    endTime: null,
    addOns: [],
    addOnFees: 0,
    securityFee: 0,
    eventWorkerFee: 0,
    facilityRentalCost: 0,
    deposit: 0,
    alcohol: false,
    facility: '',
    rate: 0,
    rateType: '',
    totalCost: 0,
    numGuests: 0,
    numOfficers: 0,
}


export const quoteSlice = createSlice({
    name: 'quote',
    initialState: initialState,
    reducers: {
        setStartDate: (state, { payload }) => { state.startDate = payload },
        setEndDate: (state, { payload }) => { state.endDate = payload },
        setStartTime: (state, { payload }) => { state.startTime = payload },
        setEndTime: (state, { payload }) => { state.endTime = payload },
        setSecurityFee: (state, { payload }) => { state.securityFee = payload; },
        setEventWorkerFee: (state, { payload }) => { state.eventWorkerFee = payload; },
        addAddOn: (state, { payload }) => { state.addOns = [...state.addOns, payload]; },
        removeAddOn:(state, {payload})=>{state.addOns = state.addOns.filter(addOn=> addOn.name !== payload.name) || []},
        setDeposit: (state, { payload }) => { state.deposit = payload; state.totalCost += payload },
        toggleAlcohol: (state, { payload }) => { state.alcohol = !state.alcohol },
        setFacility: (state, { payload }) => {
            state.facility = payload;

        },
        setFacilityRentalRate: (state, { payload }) => { state.facilityRentalCost = payload; state.totalCost += payload },
        setRate: (state, { payload }) => {
            state.rate = payload.value
            state.rateType = payload.name
            state.facilityRentalCost += state.rate;
        },
        setNumGuests: (state, { payload }) => { state.numGuests = payload },
        setNumOfficers: (state, { payload }) => { state.numOfficers = payload; },
        calculateTotalCost: (state, { payload }) => {
            state.totalCost = (state.deposit || 0) + state.facilityRentalCost + state.eventWorkerFee + state.securityFee + state.addOnFees
        },
        calculateFacilityCost: (state) => {
            const endDate =new Date(state.endDate).getDate() 
            const startDate =  new Date(state.startDate).getDate()
           const totalDays = endDate - startDate
            state.facilityRentalCost = (state.rate * (totalDays || 1))
        },
        calculateWorkerFee: (state) => {
            if (state.endTime && state.startTime) {
                state.securityFee = ((parseInt(state.endTime.substring(0, 2)) - parseInt(state.startTime.substring(0, 2))) * 40) * state.numOfficers
                if (state.facility === "Activity Hall") {                  
                    state.eventWorkerFee = state.eventWorkerFee = (parseInt(state.endTime.substring(0, 2)) - parseInt(state.startTime.substring(0, 2))) * 20
                } 
            } else {
                state.eventWorkerFee = 0
            }

        },
        calculateAddOnFees: (state, { payload }) => { 
           
            if(state.addOns.length > 1){
               state.addOnFees = state.addOns.reduce((a,b)=> (a.fee + b.fee))
            }else if(state.addOns.length === 1){
                    state.addOnFees = state.addOns[0].fee
            }else{
                state.addOnFees = 0
            }
            
        },

    },


})

export const {
    setStartDate,
    setEndDate,
    setStartTime,
    setEndTime,
    setSecurityFee,
    setEventWorkerFee,
    addAddOn,
    removeAddOn,
    calculateAddOnFees,
    setDeposit,
    toggleAlcohol,
    setFacility,
    setRate,
    calculateTotalCost,
    setNumGuests,
    setNumOfficers,
    setFacilityRentalRate,
    calculateFacilityCost,
    calculateWorkerFee
} = quoteSlice.actions