const User = require("../models/User");
const xlsx = require('xlsx');
const Income = require("../models/Income")
//Add income source
exports.addIncome = async(req,res) =>{
    const userId = req.user.id;

    try{
        const { icon, source, amount, date} = req.body;

        // validation :check for missing fields

        if(!source || !amount || !date){
            return res.status(400).json({message:"All fields are required"});
        }
        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date:new Date(date)
        });
        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (error){
        res.status(500).json({message:"Server Error"});
    }
}

//getAllIncome source
exports.getAllIncome = async(req,res) =>{
    const userId = req.user.id;
    try{
    const income = await Income.find({userId}).sort({ date: -1});
    res.json(income);
    } catch (error){
        res.status(500).json({message: "Server Error"});
    }
}

//deleteIncome source
exports.deleteIncome = async(req,res) =>{

    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({message:"Income deleted successfully"});
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
}

//downloadIncomeExcel source
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        // Prepare data for excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toISOString().split("T")[0],
        }));

        // Create workbook and worksheet
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        // Write Excel to buffer (in memory)
        const buffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });

        // Send file response
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=income_details.xlsx'
        );
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.send(buffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

