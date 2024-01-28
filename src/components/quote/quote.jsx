import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { calculateWorkerFee, calculateFacilityCost, calculateTotalCost, setDeposit, setEndDate, setEndTime, setEventWorkerFee, setFacility, setFacilityRentalRate, setNumGuests, setNumOfficers, setRate, setSecurityFee, setStartDate, setStartTime, toggleAlcohol, addAddOn, removeAddOn, calculateAddOnFees } from '../../redux/quoteSlice'
import './quote.css'
import { NavLink } from 'react-router-dom'
import QuoteDocument from './quoteDocument'
export default function Quote() {
    const dispatch = useDispatch()
    const alcoholServed = useSelector(state => state.quote.alcohol)
    const showHours = useSelector(state => (state.quote.endTime - state.quote.startTime))
    const facility = useSelector(state => state.quote.facility)
    const securityFee = useSelector(state => state.quote.securityFee)
    const eventWorkerFee = useSelector(state => state.quote.eventWorkerFee)
    const totalCost = useSelector(state => state.quote.totalCost)
    const facilityRentalCost = useSelector(state => state.quote.facilityRentalCost)
    const quote = useSelector(state => state.quote)

    const handleRateSelect = (e) => {
        const data = {
            name: e.target.options[e.target.selectedIndex].text,
            value: parseInt(e.target.value)
        }
        dispatch(setRate(data))
    }

    const handleAddOnCheckBox = (e) => {
        const addOn = { name: e.name, fee: parseInt(e.value) }
        if (e.checked) {
            dispatch(addAddOn(addOn))
        } else {
            dispatch(removeAddOn(addOn))
        }

    }

    useEffect(() => {
        dispatch(calculateAddOnFees())
        dispatch(calculateWorkerFee())
        dispatch(calculateFacilityCost())
        dispatch(calculateTotalCost())

    }, [quote])
    return (
        <>
            <div className='form d-flex flex-column justify-content-center align-items-center border mx-auto mt-5 rounded p-5' style={{ maxWidth: '800px' }}>

                <form className='w-100 mx-auto d-flex flex-column align-items-start justify-content-start' >
                    <div className='d-flex flex-row justify-content-between w-100'>
                        <div className='flex mb-3'>
                            <label className='form-label'>Start Date:</label>
                            <input className='form-control' type="date" onChange={(e) => dispatch(setStartDate(e.target.value))} />
                        </div>
                        <div className='flex mb-3'>
                            <label className='form-label'>End Date:</label>
                            <input className='form-control' type="date" onChange={(e) => dispatch(setEndDate(e.target.value))} />
                        </div>
                    </div>

                    <div className='d-flex flex-row justify-content-between w-100'>
                        <div className='flex mb-3'>
                            <label className='form-label'>Start Time:</label>
                            <input className='form-control' type="time" onChange={(e) => dispatch(setStartTime(e.target.value))} />
                        </div>
                        <div className='flex mb-3'>
                            <label className='form-label'>End Time:</label>
                            <input className='form-control' type="time" onChange={(e) => dispatch(setEndTime(e.target.value))} />
                        </div>
                    </div>
                    <div className='d-flex flex-row align-items-center  w-100'>
                        <div className='flex mb-3 me-3'>
                            <label className='form-label'>Expected Guest</label>
                            <input className='form-control' type="number" onChange={(e) => dispatch(setNumGuests(e.target.value))} />
                        </div>
                        <div className='d-flex'>
                            <input id='alcohol' className='form-check-input me-1' type='checkbox' onClick={() => dispatch(toggleAlcohol())} />
                            <label htmlFor='alcohol' className='form-check-label'>Alcohol Served</label>
                        </div>
                    </div>
                    {alcoholServed &&
                        <>
                            <div>
                                <h6 className='text-danger'>Security Required</h6>
                            </div>
                            <div className='d-flex justify-content-between align-items-center w-100'>
                                <div className=''>
                                    <label className='form-label'>Number of Officers:</label>
                                    <input type='number' className='form-control' onChange={(e) => dispatch(setNumOfficers(e.target.value))} />
                                </div>

                                <div className=''>
                                    <label className='form-label'>Security Total:{securityFee}</label>
                                    <input type='money' className='form-control' value={securityFee} min="0" onChange={(e) => dispatch(setSecurityFee(parseInt(e.target.value) || 0))} />
                                </div>
                            </div>
                        </>
                    }
                    <div className='d-flex flex-column w-100 mt-3'>
                        <select className='form-select' onChange={(e) => dispatch(setFacility(e.target.value))}>
                            <option >Select A Facility</option>
                            <option value={'A Arena'}>A Arena</option>
                            <option value={'B Arena'}>B Arena</option>
                            <option value={'C Arena'}>C Arena</option>
                            <option value={'D Arena'}>D Arena</option>
                            <option value={'ABC Arena'}>A, B, & C Arenas</option>
                            <option value={'CD Arena'}>C & D Arenas</option>
                            <option value={'Activity Hall'}>Activity Hall</option>
                        </select>
                    </div>
                    {facility &&
                        <div className='d-flex flex-column w-100 mt-3' >
                            <select className='form-select' onChange={(e) => handleRateSelect(e)}>
                                <option  >Select Rate</option>

                                {facility === 'A Arena' && <>

                                    <option value={575}>Livestock</option>
                                    <option value={800}>Clinics, Company Picnics, Special Events</option>
                                    <option value={575}>Canine Event</option>
                                    <option value={1160}>Rodeo/Concert</option>
                                    <option value={1800}>Private Party/Wedding</option>

                                </>
                                }
                                {facility === 'B Arena' && <>

                                    <option value={450}>Livestock</option>
                                    <option value={580}>Clinics, Company Picnics, Special Events</option>
                                    <option value={575}>Canine Event</option>

                                </>
                                }
                                {facility === 'C Arena' && <>

                                    <option value={395}>Livestock</option>
                                    <option value={570}>Clinics, Company Picnics, Special Events</option>
                                    <option value={575}>Canine Event</option>

                                </>
                                }
                                {facility === 'D Arena' && <>

                                    <option value={320}>Livestock</option>
                                    <option value={460}>Clinics, Company Picnics, Special Events</option>
                                    <option value={400}>Canine Event</option>

                                </>
                                }
                                {facility === 'ABC Arena' && <>

                                    <option value={1160}>Livestock</option>

                                </>
                                }
                                {facility === 'CD Arena' && <>

                                    <option value={600}>Livestock</option>

                                </>
                                }
                                {facility === 'Activity Hall' && <>

                                    <option value={500}>Daily County Resident</option>
                                    <option value={600}>Daily Family Groups/Non-County Resident/Church/Non-Profit</option>
                                    <option value={650}>Daily Business</option>
                                    <option value={60 * showHours}>Hourly County Resident</option>
                                    <option value={70 * showHours}>Hourly Family Groups/Non-County Resident/Church/Non-Profit</option>
                                    <option value={80 * showHours}>Hourly Business</option>



                                </>
                                }


                            </select>
                            <div className='d-flex justify-content-between'>
                                {facility === 'Activity Hall' &&
                                    <div className='text-start w-25'>
                                        <label className='form-label'>Event Worker Fee</label>:
                                        <input className='form-control' value={parseInt(eventWorkerFee)} onChange={(e) => dispatch(setEventWorkerFee(parseInt(e.target.value || 0)))} />
                                    </div>
                                }

                                <div className=''>
                                    <label className='form-label'>Deposit:</label>
                                    <input className='form-control' type='number' min="0" onChange={(e) => dispatch(setDeposit(parseInt(e.target.value || 0)))} />
                                </div>

                            </div>

                        </div>

                    }
                    {facility &&
                        <div className='w-100'>
                            <h5 className='mt-3'>Optional Add Ons</h5>

                            <div className="w-100 d-flex justify-content-between" role="group" aria-label="Basic checkbox toggle button group">
                                <input type="checkbox" name="P/A System" value={100} className="btn-check" id="btncheck1" onClick={(e) => handleAddOnCheckBox(e.target)} />
                                <label className="btn btn-outline-primary" htmlFor="btncheck1">PA System</label>
                                {facility !== "Activity Hall" &&
                                    <>
                                        <input type="checkbox" name='Arena Packed' value={500} className="btn-check" id="btncheck2" onClick={(e) => handleAddOnCheckBox(e.target)} />
                                        <label className="btn btn-outline-primary" htmlFor="btncheck2">Arena Packed</label>
                                    </>
                                }
                            </div>
                            {facility !== "Activity Hall" &&
                                <>
                                    <div className='d-flex  mt-2'>
                                        <div className='w-25 me-2'>
                                            <label className="form-label" htmlFor="btncheck3">Chairs</label>
                                            <input className='form-control' placeholder='Quantity' />
                                        </div>
                                        <div className='w-25'>
                                            <label className="form-label" htmlFor="btncheck3">Tables</label>
                                            <input className='form-control' placeholder='Quantity' />
                                        </div>
                                    </div>
                                </>
                            }

                        </div>
                    }
                    <div className='w-100 d-flex flex-row justify-content-between align-items-center mt-5'>
                        <div>
                            <h4>Total Rental Charge: ${facilityRentalCost.toFixed(2)}</h4>
                        </div>
                    </div>


                    <div className='d-flex justify-content-start text-start w-100  mt-5'>
                        <h2 className='w-50'>Total Due:${totalCost.toFixed(2)}</h2>
                    </div>

                </form >
                <button className="btn btn-primary w-25" onClick={() => { window.print() }}>Print Quote</button>

            </div >
            <QuoteDocument/>
        </>
    )
}
