import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  DialogTitle,
} from "@mui/material";
import axios from "axios";

interface UserProfileProps {
  name: string;
  phone: string;
  email: string;
  ic: string;
  address: string;
  age: string;
  sex: string;
  signupdate: string;
}

function SelectedUserProfile(props: UserProfileProps) {
  const [open, setOpen] = useState(false);
  const [editedMember, setEditedMember] = useState({
    sex: props.sex,
    IC_Passport: props.ic,
    active_status: 1, // Assuming active_status is managed elsewhere or static
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
        const response = await axios.put(
          "http://localhost:8090/api/v1/gym/members/update/16",
          editedMember
        );
        if (response.status === 200) {
          alert("Member updated successfully");
          handleClose();
        }
      } catch (error) {
        console.error("Failed to update member:", error);
        alert("Failed to update member");
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedMember({
      ...editedMember,
      [event.target.name]: event.target.value,
    });
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
                {props.phone}
              </div>
            </div>
          </div>
        </div>
        {/* Details and Edit/Delete Buttons */}
        {/* Rest of the component */}
        <div className="flex gap-2 px-2 items-center justify-center">
          <Button onClick={handleClickOpen} variant="contained">
            Edit
          </Button>
          <Button
            onClick={() => alert("Do you want to delete the member?")}
            variant="outlined"
            color="error"
          >
            Delete
          </Button>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Member</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Phone"
            type="text"
            fullWidth
            variant="outlined"
            name="phone"
            value={editedMember.phone}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            name="email_id"
            value={editedMember.email_id}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="IC/Passport"
            type="text"
            fullWidth
            variant="outlined"
            name="IC_Passport"
            value={editedMember.IC_Passport}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Address"
            type="text"
            fullWidth
            variant="outlined"
            name="address"
            value={editedMember.address}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Sex"
            type="text"
            fullWidth
            variant="outlined"
            name="sex"
            value={editedMember.sex}
            onChange={handleChange}
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
