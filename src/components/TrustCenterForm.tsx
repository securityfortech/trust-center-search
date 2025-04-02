
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Shield, LinkIcon, Loader2, CheckCircle } from 'lucide-react';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      trustCenterUrl: ""
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // Log data for debugging
      console.log("Sending email with data:", data);

      // Create email content
      const subject = `New Trust Center Request: ${data.company}`;
      const body = `
Company: ${data.company}
Trust Center URL: ${data.trustCenterUrl}
Date: ${new Date().toLocaleString()}
      `;
      
      // Create mailto link
      const mailtoLink = `mailto:contact@securityfortech.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open email client
      window.location.href = mailtoLink;

      // Simulate delay to allow email client to open
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success message
      toast.success("Email client opened! Please send the email to complete your request.", {
        duration: 5000
      });

      // Reset form
      form.reset();
    } catch (error) {
      console.error("Error opening email client:", error);
      toast.error("Failed to open email client. Please try again or contact us directly.", {
        duration: 5000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-center mb-4">
        <Shield className="h-5 w-5 text-primary mr-2" />
        <h2 className="text-lg font-semibold">Add your Trust Center</h2>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField 
            control={form.control} 
            name="company" 
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="e.g., Acme Corporation" className="pl-9" {...field} />
                    <Shield className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} 
          />
          
          <FormField 
            control={form.control} 
            name="trustCenterUrl" 
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trust Center URL</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="e.g., https://trust.acme.com" className="pl-9" {...field} />
                    <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} 
          />
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Preparing Email...
              </>
            ) : (
              "Submit Request"
            )}
          </Button>
          
          <div className="mt-6 space-y-3 border-t border-gray-100 pt-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Submission Process:</h3>
            <ol className="space-y-2">
              <li className="text-xs text-gray-600 dark:text-gray-400 flex items-start">
                <CheckCircle className="h-3.5 w-3.5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Send an email to contact@securityfortech.com with your company name and trust center URL</span>
              </li>
              <li className="text-xs text-gray-600 dark:text-gray-400 flex items-start">
                <CheckCircle className="h-3.5 w-3.5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Our team will review your submission</span>
              </li>
              <li className="text-xs text-gray-600 dark:text-gray-400 flex items-start">
                <CheckCircle className="h-3.5 w-3.5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>We'll verify the Trust Center URL and company information</span>
              </li>
              <li className="text-xs text-gray-600 dark:text-gray-400 flex items-start">
                <CheckCircle className="h-3.5 w-3.5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Once approved, your Trust Center will appear in our search results</span>
              </li>
            </ol>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TrustCenterForm;
