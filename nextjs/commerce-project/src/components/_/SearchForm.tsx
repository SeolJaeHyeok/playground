"use client";

import { FieldValues, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchQueryParams } from "@/type/search";

type Category = {
  name: string;
};

type SearchFormProps = {
  categories: Category[];
};

const searchSchema = z.object({
  search: z.string().optional(),
  category: z.string(),
});

export const SearchForm = ({ categories }: SearchFormProps) => {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "ALL";

  const pathname = usePathname();

  const searchForm = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search,
      category,
    },
  });

  const router = useRouter();

  const onSubmit = (data: FieldValues) => {
    const query = new URLSearchParams(data).toString();
    if (pathname === "/search") {
      router.replace(`/search?${query}`);
      return router.refresh();
    }
    router.push(`/search?${query}`);
  };

  return (
    <Form {...searchForm}>
      <form onSubmit={searchForm.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={searchForm.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex items-center">
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="사용 여부" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"ALL"}>All</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={searchForm.control}
          name="search"
          render={({ field }) => (
            <FormItem className="flex items-center">
              <FormControl>
                <Input placeholder="Search" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant={"ghost"} type="submit">
          <Search />
        </Button>
      </form>
    </Form>
  );
};
