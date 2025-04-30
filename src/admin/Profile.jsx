import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { userEmail } = useContext(AuthContext);

  return (
    <>
      {userEmail && (
        <div>
          <p className="text-sm font-semibold text-center my-auto text-gray-600 border-b p-1">
            {userEmail}
          </p>
        </div>
      )}
    </>
  );
};

export default Profile;
