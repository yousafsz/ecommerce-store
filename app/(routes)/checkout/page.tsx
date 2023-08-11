"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Button from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Container from "@/components/ui/container";
import { useRouter, useSearchParams } from "next/navigation";
import useCart from "@/hooks/use-cart";
import { useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
// import toast from "@/components/ui/use-toast"

const FormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  number: z.string().min(11, {
    message: "Phone Number must be atleast 11  characters.",
  }),
  address: z.string().min(15, {
    message: "Address must be at least 15 characters.",
  }),
  city: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
});

export default function Checkout() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const router = useRouter();
  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Order successfully placed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.id),
      }
    );

    window.location = response.data.url;
  }

  return (
    <div className="flex justify-center items-center py-12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[95vw] sm:w-2/3 space-y-3"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Muhammad Zafar" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="03001234567" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="House Number 12345 Block A Gulberg III"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Lahore" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="w-[95vw] sm:w-24 rounded-lg mt-4" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
