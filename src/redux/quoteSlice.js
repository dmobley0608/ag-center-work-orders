import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    quoteDate: new Date().toLocaleDateString(),
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
    totalDays: 1,
    totalHours: 1
}


export const quoteSlice = createSlice({
    name: 'quote',
    initialState: initialState,
    reducers: {
        setTotalDays: (state, { payload }) => { state.totalDays = parseInt(payload) },
        setTotalHours: (state, { payload }) => { state.totalHours = parseInt(payload) },
        setSecurityFee: (state, { payload }) => { state.securityFee = payload; },
        setEventWorkerFee: (state, { payload }) => { state.eventWorkerFee = payload; },
        addAddOn: (state, { payload }) => { state.addOns = [...state.addOns, payload]; },
        removeAddOn: (state, { payload }) => { state.addOns = state.addOns.filter(addOn => addOn.name !== payload.name) || [] },
        setDeposit: (state, { payload }) => { state.deposit = payload; state.totalCost += payload },
        toggleAlcohol: (state, { payload }) => { state.alcohol = !state.alcohol },
        setFacility: (state, { payload }) => {
            state.facility = payload;

        },
        setFacilityRentalRate: (state, { payload }) => { state.facilityRentalCost = payload; state.totalCost += payload },
        setRate: (state, { payload }) => {
            state.rate = payload.value
            state.rateType = payload.name
            state.facilityRentalCost = payload.totalCost;
        },
        setNumGuests: (state, { payload }) => { state.numGuests = payload },
        setNumOfficers: (state, { payload }) => { state.numOfficers = payload; },
        calculateTotalCost: (state, { payload }) => {
            state.totalCost = (state.deposit || 0) + state.facilityRentalCost + state.eventWorkerFee + state.securityFee + state.addOnFees
        },
        calculateFacilityCost: (state) => {
            if(state.rate >= 500){
                state.facilityRentalCost = (state.rate * (state.totalDays || 1))
            }
            
        },
        calculateWorkerFee: (state) => {
            state.securityFee = (state.totalHours * 40) * state.totalDays * state.numOfficers
            if (state.facility === "Activity Hall") {
                state.eventWorkerFee = (state.totalHours * 20) * state.totalDays
            }

        },
        calculateAddOnFees: (state, { payload }) => {
            state.addOnFees = state.addOns.map(addOn => addOn.totalCost).reduce((a, b) => a + b, 0)
        },
        updateAddon: (state, { payload }) => {

            state.addOns = state.addOns.filter(item => item.name !== payload.name) || []
            if (payload.fee) {
                state.addOns = [...state.addOns, payload]
            }
        }


    },


})

export const {
    setTotalDays,
    setTotalHours,
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
    calculateWorkerFee,
    updateAddon
} = quoteSlice.actions