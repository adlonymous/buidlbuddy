"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { createRoomAction } from "./actions";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(250),
  githubRepo: z.string().min(2).max(50),
  language: z.string().min(2).max(50),
});

export function CreateRoomForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      githubRepo: "",
      language: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Invoke a server action to store the data in our database
    await createRoomAction(values);
    router.push("/");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>This is your public room name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="A full-stack ecommerce website with admin dashboard"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Describe what you are working on
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="githubRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github Repository</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://github.com/username/repository"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter the Github Repository of what you are working on
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Languages & Frameworks</FormLabel>
              <FormControl>
                <Input placeholder="Svelte" {...field} />
              </FormControl>
              <FormDescription>
                What languages or frameworks are you using?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
