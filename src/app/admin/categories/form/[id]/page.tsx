"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/utils/axios";
import { useSnackbar } from "notistack";

const FormPage = () => {
  const params = useParams();
  const { id } = params;
  const [loading, setLoading] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = async (values: any) => {
    try {
      if (id == "new") {
        const response = await axiosInstance.post("/api/categories", values);
        const { status, data } = response;

        if (status == 200) {
          enqueueSnackbar(data.message, {
            variant: "success",
          });

          handleBack()
        }
      } else {
        const response = await axiosInstance.put(
          `/api/categories/${id}`,
          values
        );
        const { status, data } = response;

        if (status == 200) {
          enqueueSnackbar(data.message, {
            variant: "success",
          });

          handleBack()
        }
      }
    } catch (error) {
      // Error handling, showing error message to the user
      enqueueSnackbar("An error occurred. Please try again.", {
        variant: "error",
      });
      console.error("Error submitting form:", error);
    }
  };

  const getData = async (id) => {
    try {
      const response = await axiosInstance.get(`/api/categories/${id}`);
      const { status, data } = response;
      if (status === 200) {
        // Populate form with data when it's successfully fetched
        reset({
          name: data.name,
          description: data.description,
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      setLoading(false);
    }
  };

  const handleBack=()=>{
    router.push("/admin/categories");
  }

  useEffect(() => {
    if (id != "new") {
      getData(id);
    }
  }, [id]);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        {id == "new" ? "Create Category" : "Update Category"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          {...register("name", { required: "Name is required" })}
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ""}
        />

        {/* Description Field */}
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          {...register("description", {
            required: "Description is required",
            maxLength: {
              value: 200,
              message: "Description cannot exceed 200 characters",
            },
          })}
          error={!!errors.description}
          helperText={errors.description ? errors.description.message : ""}
        />

        {/* Submit Button */}
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default FormPage;
