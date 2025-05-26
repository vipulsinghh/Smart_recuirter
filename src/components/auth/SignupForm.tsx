
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from 'next/link';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import type { UserRole } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string(),
  role: z.enum(['student', 'company', 'college'], { required_error: "Please select a role." }),
  skills: z.string().optional(),
  tenthMarks: z.preprocess((a) => parseFloat(z.string().parse(a)), z.number().min(0).max(100).optional()),
  twelfthMarks: z.preprocess((a) => parseFloat(z.string().parse(a)), z.number().min(0).max(100).optional()),
  cgpa: z.preprocess((a) => parseFloat(z.string().parse(a)), z.number().min(0).max(10).optional()),
  additionalCertificates: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export function SignupForm() {
  const { signup } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: undefined,
      skills: "",
      tenthMarks: undefined,
      twelfthMarks: undefined,
      cgpa: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await signup(values.name, values.email, values.role as UserRole, values.password);
      toast({
        title: "Signup Attempted",
        description: `Creating account for ${values.name} as a ${values.role}...`,
      });
      // Successful signup will trigger onAuthStateChanged, which handles redirection via AuthContext's useEffect.
    } catch (error) {
      // Error toast is handled in AuthContext's signup method if it throws.
    } finally {
      // Ensure the spinner on the button stops.
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>I am a...</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="company">Company Representative</SelectItem>
                  <SelectItem value="college">College Placement Officer</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch('role') === 'student' && (
          <>
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., JavaScript, Python, Communication" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tenthMarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>10th Marks (%)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 85.5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twelfthMarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>12th Marks (%)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 90.0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cgpa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CGPA (on a 10-point scale)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 8.75" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary-end text-primary-foreground hover:opacity-90 transition-opacity" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign Up
        </Button>
        <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Button variant="link" className="p-0 h-auto" asChild>
              <Link href="/login">Log in</Link>
            </Button>
          </p>
      </form>
    </Form>
  );
}
