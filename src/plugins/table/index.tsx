import React, { useState, useEffect } from "react";
import { ColumnConfig, PaginationWithNumber } from "../../modal/common";
import { useAppDispatch, useAppSelector } from "../../modal/hooks";
import { clearResetPage } from "../../services/table-plugin/table-plugin.slice";
import ColumnResize from "react-table-column-resizer";
import "./table.scss";
import I18 from "../i18";

export type TableHeaders = {
	id: string;
	headerText: string | React.ReactElement;
	rowElement?(row: TableData, i: number): React.ReactElement | null;
	sortable: boolean;
	maxWidth?: number;
	minWidth?: number;
	className?: string;
	headCenter?: boolean;
	contentCenter?: boolean;
	hidden?: boolean;
	fieldName?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	colClicked?(e: any): void;
	resizable?: boolean;
	defaultWidth?: number;
	disabled?: boolean;
};

export type TableData = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
};

type TableProps = {
	headers: TableHeaders[];
	loading: boolean;
	totalResults: number;
	defaultSort: string;
	tableData: TableData[];
	columnSettings?: ColumnConfig[];
	fetchData(pagination: PaginationWithNumber): void;
	columnSettingsSaved?(columns: ColumnConfig[]): void;
	getResizedWidth?(width: number): void;
	rowClicked?(index: number): void;
	id: string;
};

export const Table: React.FunctionComponent<TableProps> = (props) => {
	const [pagination, setPagination] = useState<PaginationWithNumber>({
		search: "",
		pageNumber: 1,
		numResults: 50,
		sort: props.defaultSort,
		desc: false,
	});
	const [scrollBlock, setScrollBlock] = useState<boolean>(false);
	const tablePlugin = useAppSelector((store) => store.tablePlugin);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (tablePlugin.resetPage) {
			if (pagination.pageNumber === 1) {
				props.fetchData(pagination);
			}
			setPagination((prevState) => ({ ...prevState, pageNumber: 1 }));
			dispatch(clearResetPage());
		}
	}, [tablePlugin.resetPage]);

	useEffect(() => {
		setScrollBlock(props.loading);
	}, [props.loading]);

	useEffect(() => {
		props.fetchData(pagination);
	}, [pagination.pageNumber, pagination.sort, pagination.desc, pagination.search]);

	const sortChanged = (columnId: string, sortable = true) => {
		if (sortable) {
			setPagination((prevState) => ({
				...prevState,
				pageNumber: 1,
				sort: columnId,
				desc: columnId === prevState.sort ? !prevState.desc : false,
			}));
		}
	};

	const tableScrolled = () => {
		if (!scrollBlock && props.tableData.length > 0 && props.totalResults > props.tableData.length) {
			const containerElement = document.getElementById(props.id);
			const rowElement = document.getElementById(`${props.id}_row_${props.tableData.length - 1}`);
			const containerRect = containerElement?.getBoundingClientRect() ?? { bottom: 0 };
			const rowRect = rowElement?.getBoundingClientRect() ?? { top: 0 };
			if (containerRect.bottom && rowRect.top && containerRect.bottom > rowRect.top) {
				setScrollBlock(true);
				setPagination((prevState) => ({ ...prevState, pageNumber: ++prevState.pageNumber }));
			}
		}
	};

	const addOrRemoveDragClassName = (index: number, action: string) => {
		for (let i = 0; i < document.getElementsByClassName(`table_cell_dragging_${index}`).length; i++) {
			if (action == "add") {
				document.getElementsByClassName(`table_cell_dragging_${index}`)[i].classList.add("column_start_dragging");
			} else {
				document.getElementsByClassName(`table_cell_dragging_${index}`)[i].classList.remove("column_start_dragging");
			}
		}
	};

	const resizedComplete = (width: number) => {
		if (props.getResizedWidth) {
			props.getResizedWidth(width);
		}
	};

	return (
		<div className="position-relative h-100 w-100">
			<div className="custom_table_container" id={props.id} onScroll={tableScrolled}>
				<table
					className={`custom_table column_resize_table ${
						props.columnSettings && props.columnSettings.length && props.columnSettingsSaved ? "col_settings_table" : ""
					}`}
				>
					<thead>
						<tr>
							{props.headers?.map((header, index) =>
								!header.hidden ? (
									<>
										<th
											id={`custom_table_th_${header.fieldName}`}
											className={`${header.sortable ? "sortable" : ""} ${header.headCenter ? "text-center" : ""} ${
												header.className ? header.className : ""
											}`}
											key={header.id}
											onClick={() => sortChanged(header.id, header.sortable)}
										>
											{header.headerText}
											{header.sortable ? (
												pagination.sort === header.id ? (
													<span className="sort_icon_container">
														<svg
															className={pagination.desc ? "sort_visible" : "sort_hidden"}
															xmlns="http://www.w3.org/2000/svg"
															width="10"
															height="8"
															viewBox="0 0 10 8"
														>
															<path d="M4.06372 5.5957L0.306786 0.401L7.82066 0.401001L4.06372 5.5957Z" />
														</svg>
														<svg
															className={`sort_asc ${!pagination.desc ? "sort_visible" : "sort_hidden"}`}
															xmlns="http://www.w3.org/2000/svg"
															width="10"
															height="8"
															viewBox="0 0 10 8"
														>
															<path d="M3.83813 0.669434L7.59507 5.86414H0.0811999L3.83813 0.669434Z" />
														</svg>
													</span>
												) : (
													<span className="sort_icon_container">
														<svg
															className="sort_hidden"
															xmlns="http://www.w3.org/2000/svg"
															width="10"
															height="8"
															viewBox="0 0 10 8"
														>
															<path d="M4.06372 5.5957L0.306786 0.401L7.82066 0.401001L4.06372 5.5957Z" />
														</svg>
													</span>
												)
											) : null}
										</th>
										{header.resizable ? (
											<ColumnResize
												resizeEnd={(width) => {
													props.getResizedWidth ? resizedComplete(width) : null;
													addOrRemoveDragClassName(index, "remove");
												}}
												maxWidth={header.maxWidth ? header.maxWidth : null}
												minWidth={header.minWidth ? header.minWidth : 0}
												defaultWidth={header.defaultWidth ? header.defaultWidth : 0}
												id={index}
												disabled={!header.resizable}
												resizeStart={() => addOrRemoveDragClassName(index, "add")}
												className={`column_resizer ${`table_cell_dragging_${index}`}`}
											/>
										) : (
											""
										)}
									</>
								) : null
							)}
						</tr>
					</thead>
					<tbody>
						{props.tableData?.map((data, index) => (
							<tr
								className={props.rowClicked ? "cursor-pointer" : ""}
								key={`${props.id}-tr-${index}`}
								id={`${props.id}_row_${index}`}
								onClick={() => (props.rowClicked ? props.rowClicked(index) : {})}
							>
								{props.headers?.map((header, colIndex) =>
									!header.hidden ? (
										<>
											<td
												onClick={header.colClicked}
												className={`${header.contentCenter ? "text-center" : ""} ${
													header.className ? header.className : ""
												}`}
												key={`${header.id}-${index}`}
											>
												{header.rowElement ? header.rowElement(data, index) : data[header.id] ? data[header.id] : null}
											</td>
											{header.resizable ? (
												<td className={`column_resizer_body ${`table_cell_dragging_${colIndex}`}`}></td>
											) : (
												""
											)}
										</>
									) : null
								)}
							</tr>
						))}
					</tbody>
				</table>
				{props.loading || props.totalResults > props.tableData.length ? (
					<div className="text-center py-2">
						<I18 tkey="LOADING" />
						...
					</div>
				) : null}
				{!props.loading && props.tableData.length === 0 ? (
					<div className="custom_table_no_data">
						<I18 tkey="NO_DATA" />
					</div>
				) : null}
			</div>
		</div>
	);
};
