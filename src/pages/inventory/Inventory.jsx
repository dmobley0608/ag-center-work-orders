import React, { useEffect, useState } from 'react'
import { getInventoryItems } from '../../api/api'

export default function Inventory() {
    const [items, setItems] = useState([])

    const getItems = async () => {
        const result = await getInventoryItems()
        setItems(result.data)
    }
    useEffect(() => {
        getItems()
        console.log(items)
    }, [])
    return (
        <div className='d-flex flex-column justify-content-between'>
            <div className='row border border-1'>
                <div className="col-4">Barcode</div>
                <div className="col-4">Title</div>
                <div className="col-2">Quantity</div>
            </div>
            {items && items.map(item => (
                <div key={item.id} className='row border border-1 py-2'>
                    <div className="col-4">{item.barcode}</div>
                    <div className="col-4">{item.title}</div>
                    <div className="col-2 d-flex justify-content-between">
                        <div className='btn btn-secondary'>-</div>
                        <h5>{item.quantity}</h5>
                        <div className='btn btn-secondary'>+</div>
                    </div>
                </div>
            ))}

        </div>
    )
}
