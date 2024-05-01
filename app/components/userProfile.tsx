import { Button } from "@mui/material";
import React from "react";
import { BsFillTelephoneFill } from "react-icons/bs";

function SelectedUserProfile(props: any) {
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
          <Button variant="contained">Edit</Button>
          <Button
            onClick={() => alert("Do you want to delete the member?")}
            variant="outlined"
            color="error"
          >
            Delete {props.role}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SelectedUserProfile;
