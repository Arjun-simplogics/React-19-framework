import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import "./main-container.scss";
import { Header } from "antd/es/layout/layout";
import { Sidebar } from "../../components/sidebar";

export const MainContainer = () => {
	return (
		<Layout className="main_container" hasSider>
			<Sidebar />
			<div className="content_container">
				<div className="custom_header">
					<Header />
				</div>
				<Outlet />
			</div>
		</Layout>
	);
};
