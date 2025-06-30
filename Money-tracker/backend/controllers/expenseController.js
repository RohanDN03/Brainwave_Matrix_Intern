const User = require("../models/User");
const xlsx = require('xlsx');
const Expense = require("../models/Expense")
//Add expense source
exports.addExpense = async(req,res) =>{
    const userId = req.user.id;

    try{
        const { icon, category, amount, date} = req.body;

        // validation :check for missing fields

        if(!category || !amount || !date){
            return res.status(400).json({message:"All fields are required"});
        }
        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date:new Date(date)
        });
        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error){
        res.status(500).json({message:"Server Error"});
    }
}

//getAllExpense source
exports.getAllExpense = async(req,res) =>{
    const userId = req.user.id;
    try{
    const expense = await Expense.find({userId}).sort({ date: -1});
    res.json(expense);
    } catch (error){
        res.status(500).json({message: "Server Error"});
    }
}

//deleteExpense source
exports.deleteExpense = async(req,res) =>{

    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message:"Expense deleted successfully"});
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
}

//downloadIncomeExcel source
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        // Prepare data for excel
        const data = expense.map((item) => ({
            category: item.category,
            Amount: item.amount,
            Date: item.date.toISOString().split("T")[0],
        }));

        // Create workbook and worksheet
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "expense");

        // Write Excel to buffer (in memory)
        const buffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });

        // Send file response
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=expense_details.xlsx'
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
