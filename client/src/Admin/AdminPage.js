import React, { useEffect, useState } from "react";
import { useHttpClient } from "../shared/hooks/http-hook";
import "./Admin.css";
import { Card } from "react-bootstrap";

const AdminPage = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, sendRequest } = useHttpClient();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          // Il faudra mettre ca en restful
          // `http://localhost:5000/api/users/${auth.userId}/matchs/`,
          /********************************************************* */
          `http://localhost:5000/api/admin/reported/`,
          "GET",
          null,
          {
            "Content-Type": "application/json",
          }
        );
        setLoadedUsers(responseData.user);
        console.log(responseData.user);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);
  if (loadedUsers && !isLoading) {
    return (
      <Card className="CardReport">
        {loadedUsers.map((user) => {
          return <p key={user.id}> Username : {user.username}</p>;
        })}
      </Card>
    );
  } else {
    return <h1>No Users Reported</h1>;
  }
};
export default AdminPage;
