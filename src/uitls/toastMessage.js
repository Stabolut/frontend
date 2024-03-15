import { toast } from 'react-toastify';


export const toastMessageInfo = message =>
    toast.info(`${message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

export const toastMessageSuccess = message =>
    toast.success(`${message}👌`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,

    });


export const toastMessageFailure = message =>
    toast.error(`${message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,

    });



export const toastMessageNotification = message =>
    toast(<div className='ToastPopup'>
        <p>this is Notification Heading By Sender</p>
        <div className='media align-items-top'>
            <div className='media-left mr-3'>
                <figure><img src="/assets/images/nucoin-logo.png" alt="" /></figure>
            </div>
            <div className='media-body'>
                <h4 className='m-0'>Hye I am the notification</h4>
                <span>12 mins ago</span>
            </div>
        </div>
    </div>, {
        position: "top-right",
        autoClose: 55000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,

    });
