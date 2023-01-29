
import axios from "axios";
import { useEffect, useState } from "react";
import './User.css';

function User() {

const [userId, setUserId] = useState("");
const [userName, setUserName] = useState("");
const [userPassword, setUserPassword] = useState("");
const [userType, setUserType] = useState("");
const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    
    const result = await axios.get("https://localhost:44377/api/User/GetUser");
    setUsers(result.data);
    console.log(result.data);
  }

  async function save(event) {
  
    event.preventDefault();
    try {
      await axios.post("https://localhost:44377/api/User/AddUser", {
        
      userName: userName,
      userPassword: userPassword,
      userType: userType,
      
    });
    alert("User Registation Successfully");
    setUserId("");
    setUserName("");
    setUserPassword("");
    setUserType("");

    Load();
    } catch (err) {
      alert(err);
    }
  }
 
  async function editUser(users) {
    setUserName(users.userName);
    setUserPassword(users.userPassword);
    setUserType(users.userType);
  
    setUserId(users.userId);
  }
 
  async function DeleteUser(userId) {
    await axios.delete("https://localhost:44377/api/User/DeleteUser/" + userId);
    alert("User deleted Successfully");
    setUserId("");
    setUserName("");
    setUserPassword("");
    setUserType("");

    Load();
  }
 
  async function update(event) {
    event.preventDefault();
    try {
 
        await axios.patch("https://localhost:44377/api/User/UpdateUser/"+ users.find((u) => u.userId === userId).userId || userId,
        {
          userId: userId,
          userName: userName,
          userPassword: userPassword,
          userType: userType
 
        }
        );
        alert("Registation Updated");
        setUserId("");
        setUserName("");
        setUserPassword("");
        setUserType("");
    
          Load();
      } catch (err) {
        alert(err);
      }
    }

return (
    <div>
        <header className="center-max-size header">
          
          <span className={"brand"}>Admin</span>
        </header>
        <div class="container mt-4">
            <form>
                <div class="form-group">
                    <input type="text" 
                        class="form-control" 
                        id="userId" 
                        hidden
                        value={userId}
                        onChange={(event) => {
                            setUserId(event.target.value);
                        }}/>

                    <label>Username</label>
                    <input type="text" 
                        class="form-control" 
                        id="userName" 
                        value={userName}
                        onChange={(event) => {
                            setUserName(event.target.value);
                        }}/>

                    <label>Password</label>
                    <input type="password" 
                        class="form-control" 
                        id="userPassword" 
                        value={userPassword}
                        onChange={(event) => {
                            setUserPassword(event.target.value);
                        }}/>

                    <label>User Type</label>
                    <select 
                        class="form-control"
                        id="userType"
                        value={userType}
                        onChange={(event) => {
                            setUserType(event.target.value);
                        }}>
                        <option value="" disabled selected>Select your option</option>
                        <option value="Normal User">Normal User</option>
                        <option value="Administrator">Administrator</option>
                    </select>       
                </div>
                <div>
                    <button class="btn btn-primary mt-4" onClick={save}>Register</button>
                    <button class="btn btn-warning mt-4" onClick={update}>Update</button>
                </div>
            </form>
        </div>

        <br></br>

        <table class="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">User Id</th>
            <th scope="col">Username</th>
            <th scope="col">Password</th>
            <th scope="col">User Type</th>

            <th scope="col">Option</th>
          </tr>
        </thead>
        {users.map(function fn(user) {
          return (
            <tbody>
              <tr>
                <th scope="row">{user.UserId} </th>
                <td>{user.userName}</td>
                <td>{user.userPassword}</td>
                <td>{user.userType}</td>
                
                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => editUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => DeleteUser(user.userId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>


    </div>
  );
}

export default User;
