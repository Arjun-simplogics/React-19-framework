import { NavigateFunction } from "react-router-dom";

export const useAppNavigate = (navigate: NavigateFunction, parameter: string) => {
	navigate(parameter);
};
