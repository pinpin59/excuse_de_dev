'use client';
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  Button,
} from "@heroui/react";
import useSWR from 'swr';
import Link from "next/link";

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then((res) => res.json());
type Excuse = {
  id: string;
  tag: string;
  message: string;
  http_code: number;
  createdAt: string;
};
export default function App() {
  
  const [page, setPage] = React.useState(1);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { data, error, isLoading } = useSWR(
    `${API_URL}/api/excuses?page=${page}`, 
    fetcher, 
    { keepPreviousData: true }
  );
  console.log(data);
  
  const excuses: Excuse[] = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 0;

  const loadingState = isLoading || excuses.length === 0 ? "loading" : "idle";

  // Pagination
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <Link href="/">
        <Button className="mb-4" color="secondary" size="lg">Back</Button>
      </Link>
      <Table  aria-label="Table with client async pagination"
        bottomContent={
          totalPages > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={totalPages}
                onChange={handlePageChange}
              />
            </div>
          ) : null
        }
        >
        <TableHeader>
          <TableColumn key="name">Tag</TableColumn>
          <TableColumn key="height">Message</TableColumn>
          <TableColumn key="mass">HttpCode</TableColumn>
          <TableColumn key="birth_year">Date</TableColumn>
        </TableHeader>
        <TableBody
          items={excuses}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {(item) => {
            const tag = item?.tag ?? 'Unknown';
            const message = item?.message ?? 'No message';
            const httpCode = item?.http_code ?? 'N/A';
            const createdAt = item?.createdAt ?? 'N/A';

            return (
              <TableRow key={item?.id ?? 'unknown-id'}>
                <TableCell>{tag}</TableCell>
                <TableCell>{message}</TableCell>
                <TableCell>{httpCode}</TableCell>
                <TableCell>{new Date(createdAt).toLocaleString()}</TableCell>
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
    </div>
    
  );
}
