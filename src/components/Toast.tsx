import { toast } from 'react-toastify';

const Toast = (data: any) => {
    if (data.status === 'success') {
        toast.success(data.message);
    } else if (data.error) {
        toast.error(data.error);
    } else {
        for (const key of Object.keys(data.errors)) {
            toast.error(data.errors[key].toString());
        }
    }
}

export default Toast