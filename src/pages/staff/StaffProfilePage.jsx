import defaultProfile from "../../assets/defaultProfile.avif";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getStaffDetails } from "../../services/staffService";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../dashboard/components/CustomUI/index";

const StaffProfilePage = () => {
  const [searchParams] = useSearchParams();
  const empId = searchParams.get("emp");

  const [staff, setStaff] = useState({});
  //   const [profileImage, setProfileImage] = useState(defaultProfile);
  useEffect(() => {
    const getEmpDetail = async () => {
      try {
        const response = await getStaffDetails(empId);
        if (response.code === 0) {
          setStaff(response.data);
          //   if (response.data.photo != "") {
          //     console.log("photo found.")
          //     setProfileImage(response.data.photo);
          //   }
        }
      } catch {
        toast.error("Invalid staff id.");
      }
    };
    getEmpDetail();
  }, []);

  return (
    <>
      <Card className="w-full mt-3 mr-3">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>
            {staff.firstname} {staff.middlename ?? ""} {staff.lastname}
          </CardTitle>
          <Button variant="outline">Back</Button>
        </CardHeader>
        <CardContent>
          {/* <img src={profileImage} className="w-56" /> */}
        </CardContent>
      </Card>
    </>
  );
};

export default StaffProfilePage;
