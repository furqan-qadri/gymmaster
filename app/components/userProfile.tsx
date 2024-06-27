import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

function SelectedUserProfile(props: any) {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [editedMember, setEditedMember] = useState({
    full_name: props.name,
    sex: props.sex,
    IC_Passport: props.ic,
    active_status: 1,
    phone: props.phone,
    email_id: props.email,
    address: props.address,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {
    if (window.confirm("Are you sure you want to update this member?")) {
      try {
        const memberId = params.id; // Assuming the route parameter is named 'id'
        const response = await axios.put(
          `http://localhost:8090/api/v1/gym/members/update/${memberId}`,
          editedMember
        );
        if (response.data.success) {
          alert("Member updated successfully");
          handleClose();
        } else {
          alert("Failed to update member");
        }
      } catch (error) {
        console.error("Failed to update member:", error);
        alert("Failed to update member");
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        const memberId = params.id;
        const response = await axios.delete(
          `http://localhost:8090/api/v1/gym/members/delete/${memberId}`
        );
        if (response.data.success) {
          alert("Member deleted successfully");
          router.push("/members"); // Redirect to the members page
        } else {
          alert("Failed to delete member");
        }
      } catch (error) {
        console.error("Failed to delete member:", error);
        alert("Failed to delete member");
      }
    }
  };

  const handleChange = (field: any, value: any) => {
    setEditedMember((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full dark:bg-gray-700">
      <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg  overflow-hidden shadow-lg py-4">
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
          <Button onClick={handleClickOpen} variant="contained">
            Edit
          </Button>
          <Button onClick={handleDelete} variant="outlined" color="error">
            Delete
          </Button>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Member</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Full Name"
            type="text"
            fullWidth
            value={editedMember.full_name}
            onChange={(e) => handleChange("full_name", e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Phone"
            type="text"
            fullWidth
            value={editedMember.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={editedMember.email_id}
            onChange={(e) => handleChange("email_id", e.target.value)}
          />
          <TextField
            margin="dense"
            label="IC/Passport"
            type="text"
            fullWidth
            value={editedMember.IC_Passport}
            onChange={(e) => handleChange("IC_Passport", e.target.value)}
          />
          <TextField
            margin="dense"
            label="Address"
            type="text"
            fullWidth
            value={editedMember.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
          <TextField
            margin="dense"
            label="Sex"
            type="text"
            fullWidth
            value={editedMember.sex}
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
    </div>
  );
}

export default SelectedUserProfile;
