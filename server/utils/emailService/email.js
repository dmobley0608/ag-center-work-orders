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

exports.sendMessage=( subject, order)=>{
    let emailTo = []
    if(order.assignedTo.filter(emp=>emp.employee === 'khip').length > 0){emailTo.push('kmiller@hallcounty.org')}
    if(order.assignedTo.filter(emp=>emp.employee === 'dwight').length > 0){emailTo.push('tmobley@hallcounty.org')}
    if(order.assignedTo.filter(emp=>emp.employee === 'adam').length > 0){emailTo.push('asanders@hallcounty.org')}
    if(order.assignedTo.filter(emp=>emp.employee === 'kiser').length > 0){emailTo.push('kroberts@hallcounty.org')}
    const mailData = {
        from:'Chicopee Woods Work Order Request',
        to:emailTo,
        subject:subject,
        text:'There is a new work order request.',
        html:`<h1>Ticket Number: <a href="https://chicopee-ag-fcfd6e4181bf.herokuapp.com/order/${order._id}">${order._id}</a></h1>
        <h4>${order.details}</h4>
        
        Thanks,
        <h3>${order.createdBy}</h3>
        <h6>Created On:${order.createdAt}</h6>`
    }

    transporter.sendMail(mailData,(err, info)=>{
        if(err){
            console.log(err)
        }else{
            console.log("Message Sent Successfully")
        }
    })
}