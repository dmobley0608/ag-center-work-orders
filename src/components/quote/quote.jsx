import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { calculateWorkerFee, calculateTotalCost, setDeposit, setTotalHours, setEventWorkerFee, setFacility, setNumGuests, setNumOfficers, setRate, setSecurityFee, setTotalDays,  toggleAlcohol, addAddOn, removeAddOn, calculateAddOnFees, calculateFacilityCost, updateAddon } from '../../redux/quoteSlice'
import './quote.css'

import QuoteDocument from './quoteDocument'
export default function Quote() {
    const dispatch = useDispatch()
    const alcoholServed = useSelector(state => state.quote.alcohol)  
    const facility = useSelector(state => state.quote.facility)
    const securityFee = useSelector(state => state.quote.securityFee)
    const eventWorkerFee = useSelector(state => state.quote.eventWorkerFee)
    const quote = useSelector(state => state.quote)

    const handleRateSelect = (e) => {
        let totalCost = parseInt(e.target.value) < 500 ? parseInt(e.target.value) * quote.totalHours : parseInt(e.target.value)
        const data = {
            name: e.target.options[e.target.selectedIndex].text,
            value: parseInt(e.target.value),
            totalCost:totalCost || parseInt(e.target.value)
        }
        dispatch(setRate(data))
    }

    const handleAddOnCheckBox = (e, totalCost) => {
        const addOn = { name: e.name, fee: parseInt(e.value), quantity:1, totalCost:parseInt(totalCost) || parseInt(e.value) }
        if (e.checked) {
            dispatch(addAddOn(addOn))
        } else {
            dispatch(removeAddOn(addOn))
        }

    }
    const handleAddonInput = (e, price, totalCost)=>{
        const fee = {name:e.target.name, fee:price, quantity:e.target.value, totalCost:parseInt(totalCost) || parseInt(e.target.value) * price }
        dispatch(updateAddon(fee))    
    }
    const calculateFees = useCallback(() => {
        dispatch(calculateAddOnFees())      
        dispatch(calculateWorkerFee())
        dispatch(calculateFacilityCost())
        dispatch(calculateTotalCost())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { calculateFees() }, [quote])

    return (
        <>
            <div className='form d-flex flex-column justify-content-center align-items-center border mx-auto mt-5 rounded p-5' style={{ maxWidth: '800px' }}>

                <form className='w-100 mx-auto d-flex flex-column align-items-start justify-content-start' >
                    <div className='d-flex flex-row flex-wrap justify-content-between w-100'>
                        <div className='flex mb-3'>
                            <label className='form-label'>Number of Days:</label>
                            <input className='form-control' type="number" onChange={(e) => dispatch(setTotalDays(e.target.value))} />
                        </div>
                    </div>

                    <div className='d-flex flex-row flex-wrap justify-content-between w-100'>
                        <div className='flex mb-3'>
                            <label className='form-label'>Total Hours:</label>
                            <input className='form-control' type="number" onChange={(e) => dispatch(setTotalHours(e.target.value))} />
                        </div>
                    </div>
                    <div className='d-flex flex-row align-items-center  w-100 flex-wrap'>
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
                                    <option value={60}>Hourly County Resident</option>
                                    <option value={70 }>Hourly Family Groups/Non-County Resident/Church/Non-Profit</option>
                                    <option value={80 }>Hourly Business</option>



                                </>
                                }


                            </select>
                            <div className='d-flex flex-wrap justify-content-between'>
                                {facility === 'Activity Hall' &&
                                    <div className='text-start'>
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
                                <div>
                                    <input type="checkbox" name="P/A System" value={100} className="btn-check" id="btncheck1" onClick={(e) => handleAddOnCheckBox(e.target)} />
                                    <label className="btn btn-outline-primary" htmlFor="btncheck1">PA System</label>
                                </div>

                                {facility !== "Activity Hall" &&
                                    <>
                                        <div>
                                            <input type="checkbox" name='Electricity/per day' value={35} className="btn-check" id="btncheck2" onClick={(e) => handleAddOnCheckBox(e.target, (35 * quote.totalDays))} />
                                            <label className="btn btn-outline-primary" htmlFor="btncheck2">Electricity</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" name='Maintenance/ per day' value={25} className="btn-check" id="btncheck3" onClick={(e) => handleAddOnCheckBox(e.target,(25* quote.totalDays))} />
                                            <label className="btn btn-outline-primary" htmlFor="btncheck3">Maintenance</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" name='Props & Jumps/per day' value={162 } className="btn-check" id="btncheck5" onClick={(e) => handleAddOnCheckBox(e.target, (162 * quote.totalDays))} />
                                            <label className="btn btn-outline-primary" htmlFor="btncheck5">Props & Jumps</label>
                                        </div>

                                        <div>
                                            <input type="checkbox" name='Arena Packed' value={500} className="btn-check" id="btncheck4" onClick={(e) => handleAddOnCheckBox(e.target)} />
                                            <label className="btn btn-outline-primary" htmlFor="btncheck4">Arena Packed</label>
                                        </div>

                                    </>
                                }
                            </div>
                            {facility !== "Activity Hall" &&
                                <>
                                    <div className='d-flex flex-wrap mt-4 justify-content-between align-items-end'>
                                        <div className='mb-3'>
                                            <label className="form-label" htmlFor="btncheck3">Chairs</label>
                                            <input className='form-control' placeholder='Quantity' name="Chairs" onChange={(e)=> handleAddonInput(e, 1)} />
                                        </div>
                                        <div className='mb-3'>
                                            <label className="form-label" htmlFor="btncheck3">Tables</label>
                                            <input className='form-control' placeholder='Quantity' name="Tables" onChange={(e)=> handleAddonInput(e, 6 )}/>
                                        </div>
                                        <div className='mb-3'>
                                            <label className="form-label" htmlFor="btncheck3">Corral Panels(renter set up)</label>
                                            <input className='form-control' placeholder='Quantity' name="Corral Panels(renter setup)" onChange={(e)=> handleAddonInput(e, 6)}/>
                                        </div>
                                        <div className='mb-3'>
                                            <label className="form-label" htmlFor="btncheck3">Corral Panels(Ag Employee set up)</label>
                                            <input className='form-control' placeholder='Quantity' name="Corral Panels(Ag Employee set up)" onChange={(e)=> handleAddonInput(e, 9)}/>
                                        </div>
                                        <div className='mb-3'>
                                            <label className="form-label" htmlFor="btncheck3">Vendors</label>
                                            <input className='form-control' placeholder='Quantity' name="Vendors/per day" onChange={(e)=> handleAddonInput(e, 33,(33 * quote.totalDays*e.target.value))}/>
                                        </div>
                                        <div className='mb-3'>
                                            <label className="form-label" htmlFor="btncheck3">Camper Hookups</label>
                                            <input className='form-control' placeholder='Quantity' name="Camper-Hookups/per day" onChange={(e)=> handleAddonInput(e,25, (25 * quote.totalDays * e.target.value))}/>
                                        </div>
                                    </div>
                                </>
                            }

                        </div>
                    }



                </form >
                <button className="btn btn-primary w-25 mt-5" onClick={() => { window.print() }}>Print Quote</button>

            </div >
            <QuoteDocument />
        </>
    )
}
