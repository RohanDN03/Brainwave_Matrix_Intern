import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../context/userContext';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import toast from 'react-hot-toast';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import Model from '../../components/Model';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";

const Expense= ()=>{
  useUserAuth();
  const [expenseData,setExpenseData] = useState([]);
    const [loading, setloading] = useState(false);
    const [openDeleteAlert,setOpenDeleteAlert] = useState({
      show:false,
      data:null,
    })
    const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);
  // get all expense details
  const fetchExpenseDetails = async()=>{
    if(loading) return;
    setloading(true);

    try{
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );
      if(response.data){
        setExpenseData(response.data);
      }
    } catch(error){
      console.log("Something went wrong. Please try again.",error);
    }finally{
      setloading(false);
    }
  };

  // Add handle Expense
  const handleAddExpense = async (expense) =>{
    const {category,amount,date,icon} = expense;

    //validation Checks
    if(!category.trim()){
      toast.error("Category is required.");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount)<= 0){
      toast.error("Amount should be valid number greater than 0.");
      return;
    }
    if(!date){
      toast.error("Date is required.");
      return;
    }
    try{
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE,{
        category,
        amount,
        date,
        icon
      });
      setOpenAddExpenseModel(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
    } catch(error){
      console.error(
        "Error adding expense:",
        error.response?.data?.message || error.message
      );
    }  
  };

  //Delete Expense
  const deleteExpense = async (id) =>{
    try{
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      setOpenDeleteAlert({show:false,data:null});
      toast.success("Expense delete successfully");
      fetchExpenseDetails();

    } catch (error){
      console.error("Error deleting expense:",error.response?.data?.message || error.message);
    }
  };

  // handle download expense details
  const handleDownloadExpenseDetails = async ()=>{
    try{
      const response =await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType:"blob",
        }
      );
      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href =url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch(error){
      console.log("Error downloading expense details:",error);
      toast.error("Failed to download expense details. Please Try again.")
    }
  };

  useEffect(()=>{
    fetchExpenseDetails();

    return ()=>{}
  },[]);
  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={()=> setOpenAddExpenseModel(true)}
              />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDelete={(id)=>{
              setOpenDeleteAlert({show:true,data:id});
            }}
            onDownload={handleDownloadExpenseDetails}
            />

        </div>
        <Model
          isOpen={openAddExpenseModel}
          onClose={()=>setOpenAddExpenseModel(false)}
          title="Add Expense"
          >
            <AddExpenseForm onAddExpense={handleAddExpense}/>
          </Model>
          <Model 
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Expense"
          >
          <DeleteAlert
              content="Are you sure you want to delete this expense detail?"
              onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
          </Model>
      </div>

      </DashboardLayout>
  )
}
export default Expense;