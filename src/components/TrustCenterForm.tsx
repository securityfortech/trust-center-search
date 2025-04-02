import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Shield, LinkIcon } from 'lucide-react';

// Schema for form validation
const formSchema = z.object({
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters."
  }),
  trustCenterUrl: z.string().url({
    message: "Please enter a valid URL."
  })
});
type FormValues = z.infer<typeof formSchema>;
const TrustCenterForm: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      trustCenterUrl: ""
    }
  });
  const onSubmit = async (data: FormValues) => {
    try {
      // In a real app, this would be an actual API call
      // This is a simulation of sending an email
      console.log("Sending email with data:", data);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success message
      toast.success("Request submitted successfully! We'll review your Trust Center soon.", {
        duration: 5000
      });

      // Reset form
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit your request. Please try again later.", {
        duration: 5000
      });
    }
  };
  return <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-center mb-4">
        <Shield className="h-5 w-5 text-primary mr-2" />
        <h2 className="text-lg font-semibold">Add your Trust Center</h2>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField control={form.control} name="company" render={({
          field
        }) => <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="e.g., Acme Corporation" className="pl-9" {...field} />
                    <Shield className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>} />
          
          <FormField control={form.control} name="trustCenterUrl" render={({
          field
        }) => <FormItem>
                <FormLabel>Trust Center URL</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="e.g., https://trust.acme.com" className="pl-9" {...field} />
                    <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>} />
          
          <Button type="submit" className="w-full">
            Submit Request
          </Button>
          
          <p className="text-xs text-gray-500 text-center mt-2">
            Your request will be sent to our team for review. We'll add your Trust Center to our database after verification.
          </p>
        </form>
      </Form>
    </div>;
};
export default TrustCenterForm;