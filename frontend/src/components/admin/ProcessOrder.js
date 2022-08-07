import { Fragment, useEffect, useState } from "react";
import Metadata from "../layout/Metadata";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from './Sidebar'
import { clearErrors, getOrderDetails, updateOrder } from "../../actions/orderActions";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";

const ProcessOrder = () => {
    const [status, setStatus] = useState('');

    

    const { orderid } = useParams();
    const history = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, order={} } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order;
    const { error, isUpdated } = useSelector(state => state.order)

    useEffect(()=>{
        dispatch(getOrderDetails(orderid));
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        if(isUpdated){
            alert.success('Order updated successfully');
            dispatch({type: UPDATE_ORDER_RESET })
        }
    },[dispatch, alert, error, isUpdated, orderid])

    const updateOrderHandler = () => {
        const formData = new FormData();
        formData.set("orderStatus", status);
        dispatch(updateOrder(orderid, formData));
        
      };
    
      const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`
      const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

    return ( <Fragment>
        <Metadata title={`Process Order # ${order && order._id}`} />
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <Fragment>
                    
                    {loading ? <Loader /> :
                    (<div className="row d-flex justify-content-around">
                    <div className="col-12 col-lg-7 order-details">

                        <h1 className="my-5">Order # {order._id}</h1>

                        <h4 className="mb-4">Shipping Info</h4>
                        <p><b>Name:</b> {user && user.name}</p>
                        <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                        <p className="mb-4"><b>Address:</b> {shippingDetails}</p>
                        <p><b>Amount:</b> ${totalPrice}</p>

                        <hr />

                        <h4 className="my-4">Payment</h4>
                <p className={isPaid? 'greenColor': 'redColor'} ><b>{isPaid? 'PAID': 'NOT PAID'}</b></p>
                        
                        <h4 className="my-4">Stripe ID</h4>
                        <p className="greenColor" ><b>{paymentInfo && paymentInfo.id}</b></p>

                <h4 className="my-4">Order Status:</h4>
            <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? 'greenColor': 'redColor'} ><b>{orderStatus}</b></p>
						
						


                        <h4 className="my-4">Order Items:</h4>

                        <hr />
                        {orderItems && orderItems.map(item =>(
                        <div className="row my-5" key={item.product}>
                                <div className="col-4 col-lg-2"  >
                                    <img src={item.image} alt={item.name} height="45" width="65" />
                                </div>

                                <div className="col-5 col-lg-5">
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </div>


                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                    <p>${item.price}</p>
                                </div>

                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                    <p>{item.quantity} Piece(s)</p>
                                </div>
                            </div>
                    ))}
                        <hr />
                    </div>
					
					<div className="col-12 col-lg-3 mt-5">
                                    <h4 className="my-4">Status</h4>

                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name='status'
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>

                                    <button className="btn btn-primary btn-block" onClick={updateOrderHandler} >
                                        Update Status
                                </button>
                                </div>
					
                </div>)
                        }
                </Fragment>
            </div>
        </div>
    </Fragment>  );
}
 
export default ProcessOrder;