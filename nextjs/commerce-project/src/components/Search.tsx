"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import React from "react";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Search = () => {
  return (
    <div className="w-max flex gap-2">
      <Select>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder={"ALL"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">ALL</SelectItem>
          <SelectItem value="ALL">1</SelectItem>
          <SelectItem value="ALL">2</SelectItem>
        </SelectContent>
      </Select>
      <Input className="w-[400px]" />
      <Button className="bg-blue-500">
        <SearchIcon color="white"></SearchIcon>
      </Button>
    </div>
  );
};

export default Search;
