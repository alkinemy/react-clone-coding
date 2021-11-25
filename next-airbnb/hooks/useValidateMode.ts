import { useDispatch } from "react-redux";
import { useSelector } from "../store";
import { commonActions } from "../store/common";


const useValidationMode = () => {
    const dispatch = useDispatch();
    const validateMode = useSelector((state) => state.common.validateMode);
    const setValidateMode = (value: boolean) => dispatch(commonActions.setValidateMode(value));
    return {validateMode, setValidateMode};
};

export default useValidationMode;