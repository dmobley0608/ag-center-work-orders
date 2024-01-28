import React from 'react'
import { useSelector } from 'react-redux'
import './quote.css'
import { NavLink } from 'react-router-dom'
export default function QuoteDocument() {
    const quote = useSelector(state => state.quote)
    return (
        <>
            {quote.startDate && quote.startTime && quote.endTime &&
                <div className='print d-flex'>

                    <div className='left-margin px-1'>
                        {/* <div className='blank'></div> */}
                        <div className='img'>
                            <img src='https://www.hallcounty.org/ImageRepository/Document?documentID=6294' alt='hallcounty' />
                        </div>

                        <div className='mb-5'>
                            <p>Chicopee Woods <br />Agricultural Center</p>
                            <p>1855 Calvary Church Road</p>
                            <p>Gainesville, Ga. 30507</p>
                            <p>770-531-6855</p>
                        </div>
                        <div className='mb-5'>
                            <p>Khip Miller</p>
                            <p>Facility Manager</p>
                        </div>
                        <div className=''>
                            <p>Dwight Mobley</p>
                            <p>Events Coordinator</p>
                            <p>tmobley@hallcounty.org</p>
                        </div>
                    </div>

                    <div className='doc-body '>
                        <div className='header'>
                            <h1>Chicopee Woods Agricultural Center</h1>
                            <p>Rental Quote</p>
                        </div>
                        <div className='w-100 px-5 mt-3'>
                            <div className='d-flex text-left w-100'>
                                <p>Date: {new Date(quote.quoteDate).toUTCString().substring(0,16)}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-start text-left w-100 mt-3'>
                                <div className='text-start'>
                                    <p>Facility Requested: {quote.facility}</p>
                                    <p>Usage: {quote.rateType}</p>
                                    <p>State Dates: {new Date(quote.startDate).toUTCString().substring(0,16)}</p>
                                    <p>Start Time: {quote.startTime}</p>
                                    <p>Total Days: {(new Date(quote.endDate).getDate() - new Date(quote.startDate).getDate()) || 1}</p>
                                </div>

                                <div className='d-flex flex-column align-items-end'>
                                    <p>Number of Guest: {quote.numGuests}</p>
                                    <br />
                                    <p>End Date:   {new Date(quote.endDate).toUTCString().substring(0,16)}</p>
                                    <p>End Time: {quote.endTime}</p>
                                    <p>Total Hours:{(parseInt(quote.endTime.substring(0, 2)) - parseInt(quote.startTime.substring(0, 2)))}</p>

                                    <p className='mt-3'>Rate: ${quote.rate.toFixed(2)}</p>
                                </div>

                            </div>
                            <div className='w-100 text-end'>
                                <p>Facility Cost: ${quote.facilityRentalCost.toFixed(2)}</p>
                            </div>
                            <hr/>
                            <div className='mt-1 me-1'>
                                <p className='text-start'>Additonal Services <span className='text-danger'>***CASH PAYMENT ONLY***</span></p>
                                <div className='text-start mt-1'>
                                    <p>Will alcohol be served? {quote.alcohol ? "YES" : "NO"}</p>
                                </div>
                                <div className='d-flex text-start w-100 justify-content-between'>
                                    {quote.numOfficers >= 1 && <p>Number of Security Officers Required: {quote.numOfficers} </p>}
                                    {quote.securityFee > 1 && <p>Fee:${quote.securityFee.toFixed(2)}</p>}
                                </div>
                                <div className='d-flex text-start w-100 justify-content-between'>
                                    <p>Event Worker Required: {quote.eventWorkerFee ? "YES" : "NO"}</p>
                                    {quote.eventWorkerFee > 1 && <p>Fee:${quote.eventWorkerFee.toFixed(2)}</p>}
                                </div>

                                <hr />
                                {quote.addOns.length > 0 &&
                                    <>

                                        <div className='mt-1'>
                                            <p>Add Ons</p>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <div>
                                                <p>Description</p>
                                            </div>
                                            <div>
                                                <p>Price</p>
                                            </div>
                                        </div>
                                        <div className='d-flex flex-column justify-content-between'>
                                            {quote.addOns.map(addOn => (
                                                <div className='d-flex justify-content-between'>
                                                    <div key={addOn.name}>
                                                        <p>{addOn.name}</p>
                                                    </div>
                                                    <div>
                                                        <p>${addOn.fee.toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <hr />
                                    </>
                                }

                                <div className='text-end mt-3'>
                                    <p>Deposit: ${quote.deposit.toFixed(2)}</p>
                                    <p>Total Due: ${quote.totalCost.toFixed(2)}</p>
                                    <p className='mt-3'>Cash Payment: ${(quote.securityFee + quote.eventWorkerFee).toFixed(2)}</p>
                                    <p>Paid By Check, Cash, or Card: ${(quote.totalCost - quote.securityFee - quote.eventWorkerFee).toFixed(2)}</p>
                                </div>
                                <p className='text-danger mt-5' style={{ fontSize: '10px' }}>QUOTE IS ONLY VALID FOR 30 DAYS. QUOTE DOES NOT INCLUDE STALLS, SHAVINGS, CAMPER HOOK-UPS OR OTHER FEES NOT LISTED</p>

                            </div>
                        </div>

                    </div>


                </div>
            }
        </>
    )
}
