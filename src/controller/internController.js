const InternModel = require("../models/internModel");
const CollegeModel = require("../models/collegeModel")

const isValid = function (value) {
    if (typeof (value) === undefined || typeof (value) === null) { return false }
    if ((value).length == 0) { return false }
    if (typeof (value) === "string" && (value).length > 0) { return true }
}



const isRightFormatemail = function (email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

const isRightFormatmobile = function (mobile) {
    return /^([+]\d{2})?\d{10}$/.test(mobile);
}



const createInterns = async function (req, res) {
    try {
        let data = req.body
        const { name, email, mobile, collegeId } = data;
        //validations 
        if (Object.keys(data) == 0) return res.status(400).send({ status: false, msg: "NO data provided" })

        if (!isValid(name)) { return res.status(400).send({ status: false, msg: "Name is required" }) }

        if (!isValid(email)) { return res.status(400).send({ status: false, msg: "Email is required" }) }

        if (!isRightFormatemail(email)) { return res.status(400).send({ status: false, msg: "Please enter a valid email address" }) }

        if (!isValid(mobile)) { return res.status(400).send({ status: false, msg: "Mobile is required" }) }

        if (!isRightFormatmobile(mobile)) { return res.status(400).send({ status: false, msg: "Please enter a valid mobile number" }) }

    
        const isMatch= await CollegeModel.findById(collegeId)
        if(!isMatch){return res.status(400).send({status:false, msg:"please enter a valid college id"})}

        //validation ends


        const newIntern = await InternModel.create(data);
        return res.status(201).send({ status: true, msg: newIntern })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ msg: error.message })
    }

}



module.exports.createInterns = createInterns;
