"use client";
import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Typography,
  TextField,
  IconButton,
  Button,
  Stack,
  Pagination,
  Box,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

// Define user type
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  city: string;
  phone: string;
  website: string;
  company: string;
}

// method 1
// using static user data
const initialUsers: User[] = [
    { id: 1, name: "John Doe", username: "johndoe", email: "john@example.com", city: "New York", phone: "123-456-7890", website: "johndoe.com", company: "TechCorp" },
    { id: 2, name: "Jane Smith", username: "janesmith", email: "jane@example.com", city: "Los Angeles", phone: "987-654-3210", website: "janesmith.com", company: "SoftWorks" },
    { id: 3, name: "Alice Johnson", username: "alicej", email: "alice@example.com", city: "Chicago", phone: "555-123-4567", website: "alicejohnson.com", company: "CodeBase" },
    { id: 4, name: "Bob Brown", username: "bobb", email: "bob@example.com", city: "Houston", phone: "666-777-8888", website: "bobbrown.com", company: "DataSolutions" },
    { id: 5, name: "Charlie Davis", username: "charlied", email: "charlie@example.com", city: "Phoenix", phone: "444-333-2222", website: "charliedavis.com", company: "CloudX" },
    { id: 6, name: "David Wilson", username: "davidw", email: "david@example.com", city: "San Diego", phone: "777-888-9999", website: "davidwilson.com", company: "NextGen" },
    { id: 7, name: "Emma White", username: "emmaw", email: "emma@example.com", city: "Dallas", phone: "222-111-0000", website: "emmawhite.com", company: "WebHub" },
    { id: 8, name: "Frank Harris", username: "frankh", email: "frank@example.com", city: "Miami", phone: "999-000-1111", website: "frankharris.com", company: "ByteTech" },
    { id: 9, name: "Grace Lee", username: "gracel", email: "grace@example.com", city: "Atlanta", phone: "888-777-6666", website: "gracelee.com", company: "InfinityCode" },
    { id: 10, name: "Henry Adams", username: "henrya", email: "henry@example.com", city: "Seattle", phone: "123-789-4560", website: "henryadams.com", company: "SkyNet" },
    { id: 11, name: "Ivy Clark", username: "ivyc", email: "ivy@example.com", city: "Denver", phone: "321-654-9870", website: "ivyclark.com", company: "AIWorks" },
    { id: 12, name: "Jack Hall", username: "jackh", email: "jack@example.com", city: "Boston", phone: "444-222-1111", website: "jackhall.com", company: "TechFusion" },
    { id: 13, name: "Kelly Green", username: "kellyg", email: "kelly@example.com", city: "Austin", phone: "555-666-7777", website: "kellygreen.com", company: "WebWorld" },
    { id: 14, name: "Liam Baker", username: "liamb", email: "liam@example.com", city: "San Francisco", phone: "888-999-0000", website: "liambaker.com", company: "DevSphere" },
    { id: 15, name: "Mia Young", username: "miay", email: "mia@example.com", city: "Portland", phone: "777-666-5555", website: "miayoung.com", company: "BitWorks" },
    { id: 16, name: "Noah Carter", username: "noahc", email: "noah@example.com", city: "Las Vegas", phone: "111-222-3333", website: "noahcarter.com", company: "CloudSync" },
    { id: 17, name: "Olivia Roberts", username: "oliviar", email: "olivia@example.com", city: "Orlando", phone: "222-333-4444", website: "oliviaroberts.com", company: "NextWave" },
    { id: 18, name: "Peter Evans", username: "petere", email: "peter@example.com", city: "Minneapolis", phone: "333-444-5555", website: "peterevans.com", company: "CodeCraft" },
    { id: 19, name: "Quinn Scott", username: "quinns", email: "quinn@example.com", city: "Nashville", phone: "444-555-6666", website: "quinnscott.com", company: "SoftLink" },
    { id: 20, name: "Rachel King", username: "rachelk", email: "rachel@example.com", city: "Detroit", phone: "555-666-7777", website: "rachelking.com", company: "WebSync" },
  ];

export default function UserTable() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Default rows per page
 


// method 2
// we can also get data through fetch api 
 
// useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch("https://jsonplaceholder.typicode.com/users");
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const dataapi: User[] = await response.json();
//         console.log(data)
//         setUsers(data);
//       } catch (error: any) {
//         console.log(error.message);
//       } 
//     };

//     fetchUsers();
//   }, []);

// Delete user on del icon click
  const handleDelete = (id: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  // table heading data
  const columns: ColumnDef<User>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "username", header: "Username" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "city", header: "City" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "website", header: "Website" },
    { accessorKey: "company", header: "Company" },
    {
      id: "Delete User",
      header: "Delete User",
      cell: ({ row }) => (
        <IconButton color="error" onClick={() => handleDelete(row.original.id)}>
          <Delete />
        </IconButton>
      ),
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    state: { sorting, globalFilter: filtering, pagination: { pageIndex, pageSize } },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
  });

  return (
    <TableContainer component={Paper} sx={{ width: "100%", p: 2 }}>
      <Typography variant="h6" align="center" sx={{ mb: 2 }}>
        User Table with Sorting, Filtering, Pagination & Delete
      </Typography>

      {/* Filter user data */}
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        onChange={(e) => setFiltering(e.target.value)}
      />

      {/* Table */}
      <Box sx={{ overflowX: "auto" }}> 
      <Table>
        <TableHead >
          <TableRow>
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  <TableSortLabel
                    active={header.column.getIsSorted() !== false}
                    direction={header.column.getIsSorted() === "desc" ? "desc" : "asc"}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableSortLabel>
                </TableCell>
              ))
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} align="center" sx={{ py: 5 }}>
                <Typography variant="h6" color="textSecondary">
                  No Data Found
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      </Box>
      {/* Pagination  */}
      {users.length > 0 && (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 2 }}>
          <Button variant="contained" disabled={pageIndex === 0} onClick={() => setPageIndex(pageIndex - 1)}>
            Previous
          </Button>

          <Pagination
            count={Math.ceil(users.length / pageSize)}
            page={pageIndex + 1}
            onChange={(_, newPage) => setPageIndex(newPage - 1)}
          />

          <Button
            variant="contained"
            disabled={pageIndex >= Math.ceil(users.length / pageSize) - 1}
            onClick={() => setPageIndex(pageIndex + 1)}
          >
            Next
          </Button>
        </Stack>
      )}
    </TableContainer>
  );
}
