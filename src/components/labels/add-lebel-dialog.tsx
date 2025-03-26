import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "../ui/dialog";
  import { api } from "../../../convex/_generated/api";
  import { useRouter } from "next/navigation";
  import { useForm } from "react-hook-form";
  import { Button } from "../ui/button";
  import { Form, FormControl, FormField, FormItem } from "../ui/form";
  import { Input } from "../ui/input";
  import { toast } from "sonner";
  import { Id } from "../../../convex/_generated/dataModel";
  import { useMutation } from "convex/react";
  import { useState } from "react";
  import { Loader } from "lucide-react";
  
  export default function AddLabelDialog() {
    const addLabelMutation = useMutation(api.labels.createALabel);
    const [isLoading, setIsLoading] = useState(false);
  
    const router = useRouter();
    const form = useForm();
  
    const onSubmit = async ({ name }: any) => {
      if (name) {
        setIsLoading(true);
        const labelId: Id<"labels"> | null = await addLabelMutation({ name });
  
        if (labelId != undefined) {
          router.push(`/dashboard/filter-labels/${labelId}`);
          // document.getElementById("closeDialog")?.click();
  
          toast.success(" Successfully created a Label!");
          setIsLoading(false);
        }
      }
    };
  
    return (
      <DialogContent className="max-w-xl lg:h-56 flex flex-col md:flex-row lg:justify-between text-right">
        <DialogHeader className="w-full">
          <DialogTitle>Add a Label</DialogTitle>
          <DialogDescription className="capitalize">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2 border-2 p-6 border-gray-200 my-2 rounded-sm border-foreground/20"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Label name"
                          required
                          className="border-0 font-semibold text-lg"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <Button disabled={isLoading} className="">
                  {isLoading ? (
                    <div className="flex gap-2">
                      <Loader className="h-5 w-5 text-primary" />
                    </div>
                  ) : (
                    "Add"
                  )}
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    );
  }
  