import React, { useEffect, useState } from 'react'
import { editInventoryItem, getInventoryItems } from '../../api/api'

export default function Inventory() {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    
    const getItems = async () => {
        const result = await getInventoryItems()
        setItems(result.data)
    }
    const adjustInventoryQuantity = async (item, num) => {       
        setIsLoading(true)
        let newQuantity = item.quantity + num;
       const updatedItem = {
        title:item.title,
        barcode:item.barcode,
        quantity: newQuantity
       }
        const result = await editInventoryItem(item._id, {...updatedItem})
        await getItems()
        setIsLoading(false)
    }
    useEffect(() => {
        getItems()
        console.log(items)
    }, [])
    return (
        <div className='d-flex flex-column justify-content-between'>
            {!isLoading ?
                <>
                    <div className='row border border-1'>
                        <div className="col-4">Barcode</div>
                        <div className="col-4">Title</div>
                        <div className="col-2">Quantity</div>
                    </div>
                    {items && items.map(item => (
                        <div key={item._id} className='row border border-1 py-2'>
                            <div className="col-4">{item.barcode}</div>
                            <div className="col-4">{item.title}</div>
                            <div className="col-2 d-flex justify-content-between">
                                <button className='btn btn-secondary' onClick={() => { adjustInventoryQuantity(item, -1) }}>-</button>
                                <h5>{item.quantity}</h5>
                                <button className='btn btn-secondary' onClick={() => { adjustInventoryQuantity(item, 1) }}>+</button>
                            </div>
                        </div>
                    ))}
                </>
                : "Loading"
            }

        </div>
    )
}
