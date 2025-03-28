export type Pagination = {
	offset: number;
	numResults: number;
};

export type PaginationWithNumber = {
	search: string;
	pageNumber: number;
	numResults: number;
	sort: string;
	desc: boolean;
};

export type ColumnConfig = {
	fieldName: string;
	fieldText: string;
	position: number;
	visible: boolean;
	minWidth: number;
};

export type UiPagination = {
	pageNumber: number;
	numResult: number;
};
