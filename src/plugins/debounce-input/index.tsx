import React, { useImperativeHandle, forwardRef, useState } from "react";
import { i18Get } from "../i18";
import { Config } from "../../config";
import { showInfo } from "../../utils/util.fns";

let timer: NodeJS.Timeout;

type DebounceInputProps = {
	value: string;
	searchChanged(value: string): void;
	timeOut?: number;
	preventChange?: boolean;
};

export type DebounceInputHandles = {
	reset(): void;
};

const DebounceInput: React.ForwardRefRenderFunction<DebounceInputHandles, DebounceInputProps> = (props, ref) => {
	const [search, setSearch] = useState<string>(props.value ?? "");

	useImperativeHandle(ref, () => ({
		reset: () => {
			setSearch("");
		},
	}));

	const inputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (props.preventChange) {
			showInfo("PLEASE_SAVE_THE_CHANGES_BEFORE_APPLYING_FILTER");
		} else {
			setSearch(event.target.value);
			clearTimeout(timer);
			timer = setTimeout(
				() => {
					props.searchChanged(event.target.value);
				},
				props.timeOut ? props.timeOut : 300
			);
		}
	};

	return (
		<input
			type="text"
			placeholder={i18Get("SEARCH", Config.defaultLanguage)}
			maxLength={100}
			value={search}
			onChange={inputChanged}
		/>
	);
};

export default forwardRef(DebounceInput);
