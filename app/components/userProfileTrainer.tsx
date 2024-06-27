import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { useParams, useRouter } from "next/navigation"; // Corrected import
import React, { useState } from "react";
import { BsFillTelephoneFill } from "react-icons/bs";

const months = [
  { name: "January", value: 1 },
  { name: "February", value: 2 },
  { name: "March", value: 3 },
  { name: "April", value: 4 },
  { name: "May", value: 5 },
  { name: "June", value: 6 },
  { name: "July", value: 7 },
  { name: "August", value: 8 },
  { name: "September", value: 9 },
  { name: "October", value: 10 },
  { name: "November", value: 11 },
  { name: "December", value: 12 },
];

function SelectedTrainerProfile(props: any) {
  const router = useRouter();
  const params = useParams();
  const trainerId = params.id; // Assuming the route parameter is named 'id'
  const [open, setOpen] = useState(false);
  const [salaryOpen, setSalaryOpen] = useState(false);
  const [editedTrainer, setEditedTrainer] = useState({
    full_name: props.name,
    sex: props.sex,
    IC_Passport: props.ic,
    active_status: 1,
    phone: props.phone,
    email_id: props.email,
    address: props.address,
  });
  const [salaryDetails, setSalaryDetails] = useState({
    salaryMonth: 1,
    salaryYear: 2024,
    amount: 2500,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {
    if (window.confirm("Are you sure you want to update this trainer?")) {
      try {
        const response = await axios.put(
          `http://localhost:8090/api/v1/gym/trainers/update/${trainerId}`,
          editedTrainer
        );
        if (response.data.success) {
          alert("Trainer updated successfully");
          handleClose();
          window.location.reload();
        } else {
          alert("Failed to update trainer");
        }
      } catch (error) {
        console.error("Failed to update trainer:", error);
        alert("Failed to update trainer");
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this trainer?")) {
      try {
        const response = await axios.delete(
          `http://localhost:8090/api/v1/gym/trainers/delete/${trainerId}`
        );
        if (response.data.success) {
          alert("Trainer deleted successfully");
          router.push("/trainers"); // Redirect to the trainers page
        } else {
          alert("Failed to delete trainer");
        }
      } catch (error) {
        console.error("Failed to delete trainer:", error);
        alert("Failed to delete trainer");
      }
    }
  };

  const handleChange = (field: string, value: any) => {
    setEditedTrainer((prev) => ({ ...prev, [field]: value }));
  };

  const handleSalaryClickOpen = () => {
    setSalaryOpen(true);
  };

  const handleSalaryClose = () => {
    setSalaryOpen(false);
  };

  const handleSalarySubmit = async () => {
    if (window.confirm("Are you sure you want to add this salary?")) {
      try {
        const response = await axios.post(
          "http://localhost:8090/api/v1/gym/salaries/create",
          {
            trainerId: parseInt(trainerId),
            salaryMonth: salaryDetails.salaryMonth,
            salaryYear: salaryDetails.salaryYear,
            amount: salaryDetails.amount,
          }
        );
        if (response.data.success) {
          alert("Salary added successfully");
          handleSalaryClose();
          window.location.reload(); // Refresh the page
        } else {
          alert("Failed to add salary");
        }
      } catch (error) {
        console.error("Failed to add salary:", error);
        alert("Failed to add salary");
      }
    }
  };

  const handleSalaryDetailChange = (field: string, value: any) => {
    setSalaryDetails((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full dark:bg-gray-700">
      <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg py-4">
        <div className="">
          <div className="text-center my-2">
            <img
              className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto"
              src="https://randomuser.me/api/portraits/men/22.jpg"
              alt=""
            />
            <div className="py-2">
              <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                {props.name}
              </h3>
              <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                <BsFillTelephoneFill />
                {props.phone}
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-4">
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {props.email}
                </dd>
              </div>
              <div className="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  IC/Passport
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {props.ic}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Age</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {props.age}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Sex</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {props.sex}
                </dd>
              </div>
              <div className="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {props.address}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Sign up date
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {props.signupdate}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="flex gap-2 px-2 items-center justify-center">
          <Button onClick={handleSalaryClickOpen} variant="contained">
            Add Salary
          </Button>
          <Button onClick={handleClickOpen} variant="contained">
            Edit
          </Button>
          <Button onClick={handleDelete} variant="outlined" color="error">
            Delete
          </Button>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Trainer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Full Name"
            type="text"
            fullWidth
            value={editedTrainer.full_name}
            onChange={(e) => handleChange("full_name", e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Phone"
            type="text"
            fullWidth
            value={editedTrainer.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={editedTrainer.email_id}
            onChange={(e) => handleChange("email_id", e.target.value)}
          />
          <TextField
            margin="dense"
            label="IC/Passport"
            type="text"
            fullWidth
            value={editedTrainer.IC_Passport}
            onChange={(e) => handleChange("IC_Passport", e.target.value)}
          />
          <TextField
            margin="dense"
            label="Address"
            type="text"
            fullWidth
            value={editedTrainer.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
          <TextField
            margin="dense"
            label="Sex"
            type="text"
            fullWidth
            value={editedTrainer.sex}
            onChange={(e) => handleChange("sex", e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={salaryOpen} onClose={handleSalaryClose}>
        <DialogTitle>Add Salary</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel id="salary-month-label">Month</InputLabel>
            <Select
              labelId="salary-month-label"
              id="salary-month"
              value={salaryDetails.salaryMonth}
              label="Month"
              onChange={(e) =>
                handleSalaryDetailChange("salaryMonth", e.target.value)
              }
            >
              {months.map((month) => (
                <MenuItem key={month.value} value={month.value}>
                  {month.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Year"
            type="number"
            fullWidth
            value={salaryDetails.salaryYear}
            onChange={(e) =>
              handleSalaryDetailChange("salaryYear", e.target.value)
            }
          />
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={salaryDetails.amount}
            onChange={(e) => handleSalaryDetailChange("amount", e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSalaryClose}>Cancel</Button>
          <Button onClick={handleSalarySubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SelectedTrainerProfile;
