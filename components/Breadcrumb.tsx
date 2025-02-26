"use client";
import React from "react";
import {Breadcrumbs, BreadcrumbItem} from "@heroui/react";
import Link from "next/link";

export default function BreadcrumbComponent() {
  const [currentPage, setCurrentPage] = React.useState("");


  return (
    <Breadcrumbs
      classNames={{
        list: "gap-2",
      }}
      itemClasses={{
        item: [
          "px-2 py-0.5 border-small text-sm border-seconday rounded-small",
          "data-[current=true]:border-foreground data-[current=true]:bg-foreground data-[current=true]:text-background transition-colors",
          "data-[disabled=true]:border-default-400 data-[disabled=true]:bg-default-100",
        ],
        separator: "hidden",
      }}
      size="sm"
      onAction={(key) => setCurrentPage(key.toString())}
    >
      <BreadcrumbItem key="lost" isCurrent={currentPage === "lost"}>
        <Link href="/lost">Lost Page</Link>
      </BreadcrumbItem>
      <BreadcrumbItem key="not/found" isCurrent={currentPage === "not-found"}>
        <Link href="/not/found">404 Page</Link>
      </BreadcrumbItem>
      <BreadcrumbItem key="excuses" isCurrent={currentPage === "not-found"}>
        <Link href="/738">Chercher via url</Link>
      </BreadcrumbItem>
    </Breadcrumbs>
  );
}

