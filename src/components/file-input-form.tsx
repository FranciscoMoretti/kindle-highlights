"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function FileInputForm({
  label,
  description,
  handleSubmit,
  submitButtonText = "Submit",
}: {
  label: string;
  description: string;
  handleSubmit: (files: FileList) => void;
  submitButtonText?: string;
}) {
  // Images
  const MAX_FILE_SIZE = 5242880; // 5 MB
  const ALLOWED_FILE_TYPES = ["text/plain"];

  const INPUT_FILE_TYPE = "text/plain";

  // Form Schema Validation
  const formSchema = z.object({
    files: z
      .custom<FileList>(
        (val) => val instanceof FileList,
        "A file is required. ",
      )
      .refine((files) => files.length > 0, `Required at least one file`)
      .refine((files) => files.length < 2, `Only one file is allowed.`)
      .refine(
        (files) =>
          Array.from(files).every((file) => file.size <= MAX_FILE_SIZE),
        `File size is too big.`,
      )
      .refine(
        (files) =>
          Array.from(files).every((file) => {
            return ALLOWED_FILE_TYPES.includes(file.type);
          }),
        "Only .txt files are supported",
      ),
  });

  // Form Hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // Form Submit Handler (After validated with zod)
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Log values
    handleSubmit(values.files);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8"
      >
        <FormField
          control={form.control}
          name="files"
          render={(field) => (
            // render={(field) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept={INPUT_FILE_TYPE}
                  multiple={false}
                  disabled={form.formState.isSubmitting}
                  onChange={(event) => {
                    // Triggered when user uploaded a new file
                    // FileList is immutable, so we need to create a new one
                    const dataTransfer = new DataTransfer();

                    // Add newly uploaded files
                    Array.from(event.target.files!).forEach((file) =>
                      dataTransfer.items.add(file),
                    );

                    // Validate and update uploaded file
                    const newFiles = dataTransfer.files;
                    field.field.onChange(newFiles);
                  }}
                />
              </FormControl>
              <FormDescription>{description}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="self-end">
          {submitButtonText}
        </Button>
      </form>
    </Form>
  );
}
