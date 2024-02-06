import React from 'react'
import { useSelector } from 'react-redux'
import './quote.css'

export default function QuoteDocument() {
    const quote = useSelector(state => state.quote)
    return (
        <>
            {quote &&
                <div className='print d-flex'>

                    <div className='left-margin px-1 text-muted'>
                        {/* <div className='blank'></div> */}
                        <div className='img'>
                            <img src='https://www.hallcounty.org/ImageRepository/Document?documentID=6294' alt='hallcounty' />
                        </div>

                        <div className='mb-5 text-muted'>
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

                        <div className='w-100 ps-5 mt-3'>
                            <div className='d-flex text-left w-100'>
                                <p>Date: {new Date(quote.quoteDate).toUTCString().substring(0, 16)}</p>
                            </div>

                            <div className='d-flex flex-column justify-content-between align-items-start text-left w-100 mt-3'>
                                <div className='text-start w-100'>
                                    <div className='row'>
                                        <p className='col-6'>Facility Requested: {quote.facility}</p>
                                        <p className='col-6'>Usage: {quote.rateType}</p>
                                        <p className='col-6'>Guest: {quote.numGuests}</p>
                                        <p className='col-6 '>Rate: ${quote.rate.toFixed(2)}</p>
                                    </div>
                                    <div className='row mt-2 '>
                                        <p className='col-5'>Number of Show Days: {quote.totalDays}</p>
                                    </div>
                                    <div>
                                        <p className='col-5'>Number of Hours:   {quote.totalHours}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='row w-100 text-end'>
                                <p className=''>Facility Cost: ${quote.facilityRentalCost.toFixed(2)}</p>
                            </div>
                            <hr />

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

                                        <div className='mt-1 row text-start bold'>
                                            <p className='col-5'>Description</p>
                                            <p className='col-3'>Price</p>
                                            <p className='col-2'>Quantity</p>
                                            <p className='col-2 text-end'>Total</p>
                                        </div>
                                        <hr />
                                        <div className='d-flex flex-column justify-content-between'>

                                            {quote.addOns.map(addOn => (
                                                <div key={addOn.name} className='mt-1 row text-start bold'>
                                                    <p className='col-5'>{addOn.name}</p>
                                                    <p className='col-3'>${addOn.fee}</p>
                                                    <p className='col-2 text-center'>{addOn.quantity}</p>
                                                    <p className='col-2 text-end'>{addOn.totalCost}</p>
                                                </div>
                                            ))}
                                            <div className='d-flex justify-content-end'>
                                                <div >
                                                    <p>Fee Total: ${quote.addOnFees}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                    </>
                                }

                                <div className='text-end mt-3'>
                                    <p>Deposit: ${quote.deposit.toFixed(2)}</p>
                                    <p>Total Due: ${quote.totalCost.toFixed(2)}</p>
                                    <p className='mt-3'>Must Be Paid By Cash: ${(quote.securityFee + quote.eventWorkerFee).toFixed(2)}</p>
                                    <p>Paid By Check, Cash, or Card: ${(quote.totalCost - quote.securityFee - quote.eventWorkerFee).toFixed(2)}</p>
                                </div>
                                <p className='fs-1 text-muted mt-5'> THIS IS NOT AN INVOICE</p>
                                <p className='text-danger' style={{ fontSize: '10px' }}>QUOTE IS ONLY VALID FOR 30 DAYS. QUOTE DOES NOT INCLUDE STALLS, SHAVINGS, OR OTHER FEES NOT LISTED</p>

                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
