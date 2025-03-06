const adminModel = require('../model/adminModel.js');
const { responseReturn } = require('../utiles/response.js');
const bcrypt = require('bcrypt');
const {createToken} = require('../utiles/tokenCreate.js');

class authControllers {
    //admin login method
    admin_login = async (req, res) => {
        const { email, password } = req.body;
        try {
            const admin = await adminModel.findOne({ email }).select('+password');
        
            if (admin) {
                const match = await bcrypt.compare(password, admin.password);
               if(match){
                const token = await createToken({
                    id: admin._id,
                    role: admin.role    
                })
                res.cookie("accessToken", token, {
                    expires: new Date(Date.now() + 7*24*60*60*1000)
                })
                responseReturn(res, 200, {
                    token,
                    message: "Login success",
                    success: true
                })
               } else {
                responseReturn(res, 400, {
                    error: "Wrong password",
                    success: false
                })
               }
            } else {
                responseReturn(res, 400, {
                    error: "Email not found",
                    success: false
                })
            }
        } catch (error) {
            responseReturn(res, 500, {
                error: "Internal server error",
                success: false
            })
        }
    }
    //end admin login method

    // Get user info method
    getUser = async (req, res) => {
        const {id,role} = req;
        try {
            if(role ==="admin"){
                const user = await adminModel.findById(id);
                responseReturn(res, 200, {
                    userInfo: user
                })
            } else {
                responseReturn(res, 400, {
                    error: "You are not allowed to do this",
                    success: false
                })
            }

            
        } catch (error) {
            responseReturn(res, 500, {
                error: "Internal server error",
                success: false
            })
            
        }

    }
    //end Get user info method
}

module.exports = new authControllers();