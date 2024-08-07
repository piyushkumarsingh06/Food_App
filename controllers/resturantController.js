//CREATE TESTURANT

const resturantModel = require("../models/resturantModel");

const createResturantController = async(req,res)=>{
  try {
    const {title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,coords } = req.body;
    //validation
    if(!title || !coords){
        res.status(500).send({
            success:false,
            message:"Please Provide title and address"
        });
    }

    const newResutant = new resturantModel({
        title,
        imageUrl,
        foods,
        time,
        pickup,
        delivery,
        isOpen,
        logoUrl,
        rating,
        ratingCount,
        coords
    })
    await newResutant.save();
    res.status(200).send({
        success:true,
        message:"New resturant created successfully",
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:'Error in create Resturant api',
        error
    })
  }
}


//GET ALL RESTURANT
const getAllResturantController = async(req,res)=>{
    try {
        const resturants = await resturantModel.find({});
        if(!resturants){
            res.status(500).send({
                success:false,
                message:"No Resturant Available"
            })
        }
        res.status(200).send({
            success:true,
            totalCount:resturants.length,
            resturants
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in getAll resturant api",
            error
        })
    }
}

//GET RESTURANT BY ID

const getResturantByIdController = async(req,res)=>{
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
        return res.status(404).send({
            success:false,
            message:"Please Provide resturant ID",
        });
    }
    //finf resturant
    const resturant = await resturantModel.findById(resturantId);
    if(!resturant){
        return res.status(404).send({
            success:false,
            message:"np resturant found",
        });
    }
    res.status(200).send({
        success:true,
        resturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Error in getAllById resturant api",
        error
    })
  }
}


//DELETE RESTURANT

const deleteResturantController = async(req,res)=>{
    try {
        const resturantId = req.params.id;
        if (!resturantId) {
            return res.status(404).send({
                success:false,
                message:"Please Provide resturant ID",
            });
        }

        await resturantModel.findByIdAndDelete(resturantId);

        res.status(200).send({
            success:true,
            message:"Resturant successfully deleted"
        });
    } catch (error) {
        console.log(error);
    res.status(500).send({
        success:false,
        message:"Error in  resturant api",
        error
    })
    }
}
module.exports = { createResturantController,getAllResturantController,getResturantByIdController,deleteResturantController};