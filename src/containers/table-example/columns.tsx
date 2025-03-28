// import React from "react";
// import { TableHeaders } from "../../plugins/table";
// import { i18Get } from "../../plugins/i18";
// import { Config } from "../../config";
// import { dateFormat } from "../../constants";
// import dayjs from "dayjs";

// type setLoadingFN = (loading: boolean) => void;
// export const columns = (props: any): TableHeaders[] => {
// 	return [
// 		{
// 			id: "name",
// 			headerText: i18Get("NAME", Config.defaultLanguage),
// 			sortable: true,
// 			minWidth: 160,
// 			defaultWidth: 160,
// 			resizable: true,
// 		},
// 		{
// 			id: "startDate",
// 			headerText: i18Get("START_DATE", Config.defaultLanguage),
// 			sortable: true,
// 			minWidth: 120,
// 			defaultWidth: 120,
// 			resizable: true,
// 			headCenter: true,
// 			contentCenter: true,
// 			rowElement: (row) => <>{dayjs(row.startDate).format(dateFormat)}</>,
// 		},
// 		{
// 			id: "endDate",
// 			headerText: i18Get("END_DATE", Config.defaultLanguage),
// 			sortable: true,
// 			minWidth: 120,
// 			defaultWidth: 120,
// 			resizable: true,
// 			headCenter: true,
// 			contentCenter: true,
// 			rowElement: (row) => <>{dayjs(row.endDate).format(dateFormat)}</>,
// 		},
// 		{
// 			id: "store",
// 			headerText: i18Get("STORE_ACTION", Config.defaultLanguage),
// 			className: "",
// 			minWidth: 100,
// 			defaultWidth: 100,
// 			headCenter: true,
// 			resizable: true,
// 			contentCenter: true,
// 			rowElement: (row) => (
// 				<div className="d-flex align-items-center justify-content-center">
// 					<span className="mr-2">
						
// 					</span>

// 				</div>
// 			),
// 			sortable: false,
// 		},
// 	];
// };
