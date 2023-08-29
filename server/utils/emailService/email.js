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
    const mailData = {
        from:'Chicopee Woods Work Order Request',
        to:["kmiller@hallcounty.org", "tmobley@hallcounty.org", "asanders@hallcounty.org", "kroberts@hallcounty.org"],
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