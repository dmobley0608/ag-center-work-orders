const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    port:465,
    host:"smtp.gmail.com",
    auth:{
        user:process.env.GOOGLE_USER,
        pass:process.env.GOOGLE_PASS
    },
    secure:true
})

exports.sendMessage=(subject, order)=>{
    let emailTo = ["kmiller@hallcounty.org","tmobley@hallcounty.org"]  
    if(order.assignedTo.filter(emp=>emp.employee === 'adam').length > 0){emailTo.push('asanders@hallcounty.org')}
    if(order.assignedTo.filter(emp=>emp.employee === 'kiser').length > 0){emailTo.push('kroberts@hallcounty.org')}
     if(order.assignedTo.filter(emp=>emp.employee === 'peyton').length > 0){emailTo.push('pblack@hallcounty.org')}
    
    const mailData = {
        from:'info@chicoppework.com',
        to:emailTo,
        subject:subject,       
        html:`<h1>Ticket Number: <a href="https://chicopee-ag-fcfd6e4181bf.herokuapp.com/order/${order._id}">${order._id}</a></h1>
        <h4>${order.details}</h4>       
        Thanks,
        <h3>${order.createdBy}</h3>
        <h6>Created On:${order.createdAt}</h6>
        ${order.comments ?"Comments: " + order.comments.map(comment=>"<br><hr>" + comment.body +'<br>' + comment.date) + "<hr>":""}
        `
    }

    transporter.sendMail(mailData,(err, info)=>{
        if(err){
            console.log(err)
        }else{
            console.log("Message Sent Successfully")
        }
    })
}

exports.sendInventoryMessage=(subject, item)=>{
    let emailTo = ["kmiller@hallcounty.org","tmobley@hallcounty.org"]  
    
    
    const mailData = {
        from:'info@chicoppework.com',
        to:emailTo,
        subject:subject,       
        html:`<h1>Inventory: ${item.title}</h1>
        <h4>Only ${item.quantity} left in stock. Please order more </h4>       
        Thanks,
        Chicopee Inventory       
        `
    }

    transporter.sendMail(mailData,(err, info)=>{
        if(err){
            console.log(err)
        }else{
            console.log("Message Sent Successfully")
        }
    })
}

