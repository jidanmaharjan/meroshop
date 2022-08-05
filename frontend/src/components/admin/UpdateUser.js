import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import Metadata from "../layout/Metadata";
import { useAlert } from "react-alert";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  updateUser,
  getUserDetails,
  clearErrors,
} from "../../actions/userActions";
import Sidebar from './Sidebar'


import { UPDATE_USER_RESET } from "../../constants/userConstants";

const UpdateUser = () => {
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const history = useNavigate();
    const { userid } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, isUpdated, loading } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.userDetails);

  useEffect(() => {
    if (user && user._id !== userid){
        dispatch(getUserDetails(userid))
    } else{
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if(error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if(isUpdated){
        alert.success('User updated successfully');
        history('/admin/users');
        dispatch({
            type: UPDATE_USER_RESET
        })
        dispatch(getUserDetails(userid))
    }
  }, [dispatch, alert, isUpdated, error, user, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("role", role);

    dispatch(updateUser(user._id,formData));
  };

    return ( <Fragment>
        <Metadata title={`Update User`} />
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} >
                        <h1 className="mt-2 mb-5">Update User</h1>

                        <div className="form-group">
                            <label htmlFor="name_field">Name</label>
                            <input 
								type="name" 
								id="name_field" 
								className="form-control"
                                name='name'
                                value={name}
                                onChange={(e)=> setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                                    <label htmlFor="role_field">Role</label>

                                    <select
                                        id="role_field"
                                        className="form-control"
                                        name='role'
                                        value={role}
                                onChange={(e)=> setRole(e.target.value)}
                                    >
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3"
                        disabled={loading? true: false} >Update</button>
                    </form>
                </div>
            </div>
            </div>
        </div>
    </Fragment> );
}
 
export default UpdateUser;