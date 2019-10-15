const Logo = require('../../models').Logo;
exports.create_logo = async(req, res, next) => {
    try {
        const newLogo = {
            title: req.body.title,
            userId: req.body.userId,
            vectorData: req.body.vectorData,
            URL: req.body.url
        }  
        
        await Logo.create(newLogo);
        res.status(200).json({
            message:"Logo created",
            newLogo
        })
    } catch (error) {
        throw error;
    }
}

exports.get_all_logos = async(req, res, next) => {
    try {
        const logos = await Logo.findAll();
        res.status(200).json({
            logos
        })
    } catch (error) {
        throw error;
    }
}
exports.get_logos = async(req, res, next) => {
    try {
        const logos = await Logo.findAll({
            where:{
                userId: req.params.userId
            }
        });

        if(logos.length < 1){
            res.status(501).json({
                message:"You havae no logo yet!"
            })
        }
        res.status(200).json({
            logos
        })
    } catch (error) {
        throw error,
        res.status(200).json({
            message: "something went wrong"
        })
    }
}
