import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "./components/Table";

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const App = () => {
  const { data, error, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const columns: ColumnDef<User>[] = React.useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Username",
        accessorKey: "username",
      },
    ],
    []
  );

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Table</h1>
      <Table<User> columns={columns} data={data || []} />
    </div>
  );
};

export default App;
