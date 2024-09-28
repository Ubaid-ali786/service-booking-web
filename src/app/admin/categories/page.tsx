"use client";

import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, CircularProgress, Container } from "@mui/material";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";

const IndexPage = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params: { row: { id: any } }) => (
        <>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row.id)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row.id)}
            style={{ marginLeft: 8 }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/api/categories");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      const response = await axiosInstance.delete(`/api/categories/${id}`);
      if (response.status == 200) {
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };

  const handleEdit = (id: any) => {
    router.push(`/admin/categories/form/${id}`);
  };

  const handleAdd = () => {
    router.push(`/admin/categories/form/new`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <h3>Categories</h3>

      <Button onClick={() => handleAdd()}>Add</Button>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </Container>
  );
};

export default IndexPage;
